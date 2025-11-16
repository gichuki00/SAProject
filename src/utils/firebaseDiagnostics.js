import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Firebase Connectivity Diagnostics
export const runFirebaseDiagnostics = async () => {
  console.log('🔍 Starting Firebase Connectivity Diagnostics...');
  
  const results = {
    auth: { status: 'unknown', details: {} },
    firestore: { status: 'unknown', details: {} },
    network: { status: 'unknown', details: {} }
  };

  // 1. Test Network Connectivity
  try {
    console.log('🌐 Testing network connectivity...');
    const response = await fetch('https://firestore.googleapis.com/v1/projects/serveradminproject/databases/(default)/documents');
    results.network.status = response.ok ? 'connected' : 'blocked';
    results.network.details = {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    };
    console.log(`🌐 Network status: ${results.network.status}`);
  } catch (error) {
    results.network.status = 'error';
    results.network.details = { error: error.message };
    console.error('🌐 Network test failed:', error);
  }

  // 2. Test Firebase Auth
  try {
    console.log('🔐 Testing Firebase Auth...');
    const currentUser = auth.currentUser;
    if (currentUser) {
      results.auth.status = 'authenticated';
      results.auth.details = {
        uid: currentUser.uid,
        email: currentUser.email,
        emailVerified: currentUser.emailVerified
      };
      console.log('✅ Auth: User is authenticated');
    } else {
      results.auth.status = 'not_authenticated';
      console.log('⚠️ Auth: No user currently authenticated');
    }
  } catch (error) {
    results.auth.status = 'error';
    results.auth.details = { error: error.message };
    console.error('❌ Auth test failed:', error);
  }

  // 3. Test Firestore Connectivity
  try {
    console.log('🗄️ Testing Firestore connectivity...');
    
    // Test 1: Try to read a test document
    const testDocRef = doc(db, 'diagnostics', 'connectivity-test');
    const testDoc = await getDoc(testDocRef);
    
    if (testDoc.exists()) {
      results.firestore.status = 'connected';
      results.firestore.details = {
        canRead: true,
        canWrite: 'unknown',
        documentExists: true
      };
      console.log('✅ Firestore: Can read documents');
    } else {
      // Document doesn't exist, try to create it
      try {
        await setDoc(testDocRef, {
          test: true,
          timestamp: serverTimestamp(),
          lastCheck: new Date().toISOString()
        });
        results.firestore.status = 'connected';
        results.firestore.details = {
          canRead: true,
          canWrite: true,
          documentExists: false,
          created: true
        };
        console.log('✅ Firestore: Can read and write documents');
      } catch (writeError) {
        results.firestore.status = 'read_only';
        results.firestore.details = {
          canRead: true,
          canWrite: false,
          writeError: writeError.message
        };
        console.log('⚠️ Firestore: Can read but cannot write');
      }
    }
  } catch (error) {
    results.firestore.status = 'error';
    results.firestore.details = { 
      error: error.message,
      code: error.code,
      fullError: error
    };
    console.error('❌ Firestore test failed:', error);
  }

  // 4. Test with known user credentials
  try {
    console.log('🧪 Testing with known credentials...');
    const testUser = await signInWithEmailAndPassword(auth, 'testuser@example.com', 'test123456');
    console.log('✅ Test user authentication successful');
    
    // Test Firestore with authenticated user
    const userDocRef = doc(db, 'users', testUser.user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      console.log('✅ Can read user document');
    } else {
      console.log('ℹ️ User document does not exist (expected for new test)');
    }
    
    await signOut(auth);
    console.log('✅ Test user signed out');
    
  } catch (authError) {
    console.error('❌ Test authentication failed:', authError);
    results.auth.details.testError = authError.message;
  }

  console.log('📊 Diagnostic Results:', results);
  return results;
};

// Generate troubleshooting recommendations
export const generateTroubleshootingSteps = (diagnosticResults) => {
  const steps = [];
  
  // Network issues
  if (diagnosticResults.network.status === 'blocked' || diagnosticResults.network.status === 'error') {
    steps.push({
      category: 'Network',
      issue: 'Firebase APIs are blocked',
      solutions: [
        'Disable ad blockers (uBlock, AdBlock, etc.)',
        'Check if VPN/proxy is blocking Firebase',
        'Verify firewall allows Firebase domains',
        'Try different network or browser'
      ]
    });
  }
  
  // Firestore issues
  if (diagnosticResults.firestore.status === 'error') {
    const error = diagnosticResults.firestore.details.error;
    if (error.includes('offline') || error.includes('unavailable')) {
      steps.push({
        category: 'Firestore',
        issue: 'Client appears to be offline',
        solutions: [
          'Check internet connection',
          'Verify Firebase project is active',
          'Check Firestore database is created',
          'Ensure project ID matches Firebase console'
        ]
      });
    } else if (error.includes('permission') || error.includes('denied')) {
      steps.push({
        category: 'Firestore',
        issue: 'Permission denied',
        solutions: [
          'Check Firestore security rules',
          'Ensure user is authenticated',
          'Verify database exists and is accessible'
        ]
      });
    }
  }
  
  // Auth issues
  if (diagnosticResults.auth.status === 'error') {
    steps.push({
      category: 'Authentication',
      issue: 'Authentication error',
      solutions: [
        'Verify API key is correct',
        'Check authDomain matches Firebase project',
        'Ensure Auth is enabled in Firebase console'
      ]
    });
  }
  
  return steps;
};

// Quick connectivity test
export const quickConnectivityTest = async () => {
  try {
    const response = await fetch('https://firebase.googleapis.com/v1/projects/serveradminproject');
    return { success: true, status: response.status };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
