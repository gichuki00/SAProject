// Test script to create a user and verify Firebase connection
// Run this in browser console: import('./create-test-user.js').then(m => m.createTestUser())

import { auth } from './firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const createTestUser = async () => {
  console.log('🧪 === CREATING TEST USER ===');
  
  try {
    // Test user credentials
    const testEmail = 'testuser@example.com';
    const testPassword = 'test123456';
    
    console.log('📧 Creating test user:', testEmail);
    console.log('🔑 Password:', testPassword);
    
    const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
    
    console.log('✅ Test user created successfully!');
    console.log('🆔 User ID:', userCredential.user.uid);
    console.log('📧 Email:', userCredential.user.email);
    console.log('📧 Verified:', userCredential.user.emailVerified);
    
    console.log('💡 Now you can test login with:');
    console.log('   Email:', testEmail);
    console.log('   Password:', testPassword);
    
    return userCredential.user;
    
  } catch (error) {
    console.error('❌ Failed to create test user:', error);
    
    if (error.code === 'auth/operation-not-allowed') {
      console.log('🚨 CRITICAL: Email/Password authentication is NOT ENABLED!');
      console.log('💡 SOLUTION: Go to Firebase Console → Authentication → Sign-in method → Enable Email/Password');
    } else if (error.code === 'auth/email-already-in-use') {
      console.log('✅ Test user already exists. You can try logging in with:', testEmail);
    }
    
    throw error;
  }
};

// Test login with the created user
export const testLogin = async () => {
  console.log('🧪 === TESTING LOGIN ===');
  
  try {
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    
    const testEmail = 'testuser@example.com';
    const testPassword = 'test123456';
    
    console.log('🔐 Testing login with:', testEmail);
    
    const userCredential = await signInWithEmailAndPassword(auth, testEmail, testPassword);
    
    console.log('✅ Login successful!');
    console.log('🆔 User ID:', userCredential.user.uid);
    console.log('📧 Email:', userCredential.user.email);
    
    return userCredential.user;
    
  } catch (error) {
    console.error('❌ Login test failed:', error);
    throw error;
  }
};
