import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBHmsGIPXk7XPelzKJWLN4MBws8y-vpQq0",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "serveradminproject.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "serveradminproject",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "serveradminproject.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "623711946944",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:623711946944:web:5a6bcf89c4fcb4ead48525",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-QHMY7WE25X"
};

// Initialize Firebase with error handling
let app;
let auth;
let db;

try {
  console.log(' Initializing Firebase...');
  app = initializeApp(firebaseConfig);
  console.log(' Firebase app initialized successfully');
  
  // Initialize Firebase services
  auth = getAuth(app);
  console.log(' Firebase Auth initialized');
  
  db = getFirestore(app);
  console.log(' Firebase Firestore initialized');
  
  // Test auth configuration
  console.log(' Auth config:', {
    apiKey: firebaseConfig.apiKey ? 'present' : 'missing',
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId
  });
  
} catch (error) {
  console.error(' Firebase initialization failed:', error);
  throw error;
}

export { auth, db };
export default app;
