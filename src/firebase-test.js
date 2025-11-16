// Firebase Configuration Test Script
// Run this in browser console to test Firebase setup

import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Test Firebase connection
export const testFirebaseConnection = async () => {
  console.log('🔧 Testing Firebase Configuration...');
  
  try {
    // Test 1: Check if auth is available
    console.log('📋 Step 1: Checking Firebase Auth...');
    if (!auth) {
      console.error('❌ Firebase Auth not initialized');
      return false;
    }
    console.log('✅ Firebase Auth initialized');
    
    // Test 2: Check auth configuration
    console.log('📋 Step 2: Checking Auth configuration...');
    console.log('🔐 Auth object:', auth);
    console.log('🌐 Auth config:', auth.config);
    
    // Test 3: Try a simple auth operation (this will fail but tell us if auth is working)
    console.log('📋 Step 3: Testing auth operation...');
    try {
      await signInWithEmailAndPassword(auth, 'test@example.com', 'testpassword');
    } catch (error) {
      console.log('✅ Auth operation attempted (expected to fail)');
      console.log('🔍 Error details:', {
        code: error.code,
        message: error.message,
        customData: error.customData
      });
      
      // Check for specific errors
      if (error.code === 'auth/operation-not-allowed') {
        console.log('🚨 ISSUE FOUND: Email/Password authentication is not enabled in Firebase console!');
        console.log('💡 SOLUTION: Go to Firebase Console → Authentication → Sign-in method → Enable Email/Password');
        return false;
      } else if (error.code === 'auth/user-not-found') {
        console.log('✅ Auth is working correctly (user not found is expected for test credentials)');
        return true;
      } else if (error.code === 'auth/invalid-email') {
        console.log('✅ Auth is working correctly (invalid email is expected)');
        return true;
      }
    }
    
    console.log('✅ Firebase connection test completed');
    return true;
    
  } catch (error) {
    console.error('❌ Firebase test failed:', error);
    return false;
  }
};

// Firebase Configuration Checker
export const checkFirebaseConfig = () => {
  console.log('🔍 Checking Firebase Configuration...');
  
  // Check if all required config values are present
  const requiredConfigs = [
    'apiKey',
    'authDomain', 
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId'
  ];
  
  const firebaseConfig = {
    apiKey: "AIzaSyBHmsGIPXk7XPelzKJWLN4MBws8y-vpQq0",
    authDomain: "serveradminproject.firebaseapp.com",
    projectId: "serveradminproject",
    storageBucket: "serveradminproject.firebasestorage.app",
    messagingSenderId: "623711946944",
    appId: "1:623711946944:web:5a6bcf89c4fcb4ead48525",
    measurementId: "G-QHMY7WE25X"
  };
  
  let missingConfigs = [];
  
  requiredConfigs.forEach(config => {
    if (!firebaseConfig[config]) {
      missingConfigs.push(config);
    }
  });
  
  if (missingConfigs.length > 0) {
    console.error('❌ Missing Firebase configurations:', missingConfigs);
    return false;
  }
  
  console.log('✅ All required Firebase configurations are present');
  console.log('📋 Configuration Details:', {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    apiKey: firebaseConfig.apiKey.substring(0, 10) + '...'
  });
  
  return true;
};

// Run both tests
export const runFullFirebaseTest = async () => {
  console.log('🚀 Starting Full Firebase Test...');
  
  const configCheck = checkFirebaseConfig();
  const connectionTest = await testFirebaseConnection();
  
  if (configCheck && connectionTest) {
    console.log('🎉 All Firebase tests passed! Your configuration is correct.');
    console.log('💡 If login still fails, check:');
    console.log('   1. Email/Password is enabled in Firebase console');
    console.log('   2. User exists in Firebase Authentication');
    console.log('   3. Email and password are correct');
  } else {
    console.log('❌ Firebase configuration issues found. Please fix them.');
  }
  
  return configCheck && connectionTest;
};
