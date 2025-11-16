import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Listen for auth state changes
  useEffect(() => {
    console.log('🔍 Setting up auth state listener...');
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('👤 Auth state changed:', user ? `User: ${user.email}` : 'No user');
      
      if (user) {
        // Get additional user data from Firestore
        try {
          console.log('📚 Fetching user data from Firestore...');
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = { ...user, ...userDoc.data() };
            setCurrentUser(userData);
            console.log('✅ User data loaded:', userData.email);
          } else {
            setCurrentUser(user);
            console.log('✅ User authenticated (no Firestore data)');
          }
        } catch (err) {
          console.error('❌ Error fetching user data:', err);
          // Check if it's an offline error
          if (err.code === 'unavailable' || err.message.includes('offline')) {
            console.log('📱 App is offline, using basic user data');
            setCurrentUser(user);
          } else {
            console.error('🔥 Firestore error details:', {
              code: err.code,
              message: err.message,
              stack: err.stack
            });
            setCurrentUser(user); // Still set user even if Firestore fails
          }
        }
      } else {
        setCurrentUser(null);
        console.log('👋 User logged out');
      }
      
      setLoading(false);
      console.log('🔄 Auth state listener setup complete');
    });

    return unsubscribe;
  }, []);

  // Sign up function
  const signup = async (email, password, displayName) => {
    try {
      setError('');
      console.log('Starting signup process for:', email);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User created successfully:', user.uid);

      // Update display name
      await updateProfile(user, { displayName });
      console.log('Profile updated with display name:', displayName);

      // Store additional user data in Firestore
        try {
          await setDoc(doc(db, 'users', user.uid), {
            displayName,
            email,
            createdAt: new Date().toISOString(),
            favoriteRecipes: [],
            savedRecipes: []
          });
          console.log('✅ User data stored in Firestore');
        } catch (firestoreErr) {
          console.warn('⚠️ Could not store user data in Firestore:', firestoreErr);
          // Continue anyway - user is still authenticated
        }

      return user;
    } catch (err) {
      console.error('AuthContext signup error:', err);
      setError(err.message);
      throw err;
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      setError('');
      console.log('🔐 Starting login process for:', email);
      console.log('🔑 Password provided:', password ? 'yes' : 'no');
      console.log('📡 Calling signInWithEmailAndPassword...');
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Login successful! User:', userCredential.user.email);
      console.log('🆔 User ID:', userCredential.user.uid);
      console.log('📧 Verified email:', userCredential.user.emailVerified);
      
      return userCredential.user;
    } catch (err) {
      console.error('❌ Login failed:', err);
      console.error('🔍 Error code:', err.code);
      console.error('💬 Error message:', err.message);
      
      setError(err.message);
      throw err;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setError('');
      await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    error,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
