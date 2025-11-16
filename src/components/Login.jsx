import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, currentUser, loading: authLoading } = useAuth();

  // Check for success message from signup
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      if (location.state?.email) {
        setFormData(prev => ({ ...prev, email: location.state.email }));
      }
      // Clear the state after displaying the message
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      const from = location.state?.from?.pathname || '/home';
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, location]);

  // Clean email value to handle IDE link formatting
  const cleanEmail = (email) => {
    if (!email || typeof email !== 'string') return email;
    
    // Handle IDE format: testuser(cci:4://file://example.com:0:0-0:0)
    // Extract the domain from the cci link
    const cciMatch = email.match(/(.+)\(cci:.*?file:\/\/([^/:]+).*?\)/);
    if (cciMatch) {
      return `${cciMatch[1]}@${cciMatch[2]}`;
    }
    
    // Handle bracket format: testuser[example.com](...)
    const bracketMatch = email.match(/(.+)\[([^\]]+)\]/);
    if (bracketMatch) {
      return `${bracketMatch[1]}@${bracketMatch[2]}`;
    }
    
    return email;
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Clean email before validation
    const cleanEmailValue = cleanEmail(formData.email);
    console.log('🔍 Debug - original email:', formData.email);
    console.log('🔍 Debug - clean email:', cleanEmailValue);
    
    if (!cleanEmailValue) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(cleanEmailValue)) {
      console.log('🔍 Debug - regex test failed');
      console.log('🔍 Debug - regex pattern:', /\S+@\S+\.\S+/);
      console.log('🔍 Debug - regex test result:', /\S+@\S+\.\S+/.test(cleanEmailValue));
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clean email value if it contains IDE link formatting
    let cleanValue = value;
    if (name === 'email' && value.includes('[example.com]')) {
      cleanValue = value.replace(/\[.*?\]/g, '');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: cleanValue
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Clear auth error when user starts typing
    if (authError) {
      setAuthError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🔥 Login form submitted');
    console.log('📧 Email:', formData.email);
    console.log('🔑 Password:', formData.password ? '***' : 'empty');
    
    // Clear previous errors
    setErrors({});
    setAuthError('');
    
    if (!validateForm()) {
      console.log('❌ Form validation failed');
      return;
    }
    
    console.log('✅ Form validation passed');
    console.log('🚀 Attempting login with:', cleanEmail(formData.email));
    setLoading(true);
    
    try {
      console.log('📡 Calling login function...');
      const user = await login(cleanEmail(formData.email), formData.password);
      console.log('✅ Login successful! User:', user);
      
      const from = location.state?.from?.pathname || '/home';
      console.log('🏠 Navigating to:', from);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('❌ Login error:', error);
      console.error('🔍 Error code:', error.code);
      console.error('💬 Error message:', error.message);
      
      // Handle specific Firebase errors
      let errorMessage = 'Failed to sign in. Please check your credentials.';
      
      if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Email/Password authentication is not enabled in Firebase. Please enable it in the Firebase console.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection.';
      }
      
      setAuthError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your Recipe Finder account</p>
        </div>

        {successMessage && (
          <div className="success-message" style={{
            color: '#27ae60',
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            padding: '10px 15px',
            borderRadius: '5px',
            marginBottom: '15px'
          }}>
            {successMessage}
          </div>
        )}

        {authError && (
          <div className="auth-error" style={{
            color: '#e74c3c',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            padding: '10px 15px',
            borderRadius: '5px',
            marginBottom: '15px'
          }}>
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? 'error' : ''}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={errors.password ? 'error' : ''}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" name="remember" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
              onClick={(e) => {
                console.log('🖱️ Button clicked directly');
                handleSubmit(e);
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            
            {/* Debug button for testing */}
            <button
              type="button"
              className="login-btn"
              style={{marginTop: '10px', backgroundColor: '#ff6b6b'}}
              onClick={async () => {
                console.log('🧪 === COMPREHENSIVE FIREBASE TEST ===');
                
                // Test 1: Check Firebase imports
                console.log('📋 Test 1: Firebase imports...');
                try {
                  const firebase = await import('../firebase');
                  console.log('✅ Firebase imported successfully');
                  console.log('🔐 Auth available:', !!firebase.auth);
                  console.log('🗄️ Firestore available:', !!firebase.db);
                } catch (error) {
                  console.error('❌ Firebase import failed:', error);
                  return;
                }
                
                // Test 2: Check AuthContext (using variables from hook)
                console.log('📋 Test 2: AuthContext...');
                console.log('👤 Current user:', currentUser?.email || 'none');
                console.log('⏳ Auth loading:', authLoading);
                
                // Test 3: Test Firebase auth operation
                console.log('📋 Test 3: Firebase auth operation...');
                try {
                  const { auth } = await import('../firebase');
                  const { signInWithEmailAndPassword } = await import('firebase/auth');
                  
                  console.log('🔧 Testing auth with dummy credentials...');
                  await signInWithEmailAndPassword(auth, 'test@test.com', 'test123');
                } catch (error) {
                  console.log('🔍 Auth test error (expected):', error.code);
                  
                  if (error.code === 'auth/operation-not-allowed') {
                    console.log('🚨 CRITICAL ISSUE: Email/Password authentication is NOT ENABLED!');
                    console.log('💡 SOLUTION: Go to Firebase Console → Authentication → Sign-in method → Enable Email/Password');
                  } else if (error.code === 'auth/user-not-found') {
                    console.log('✅ GOOD: Auth is working (user not found is expected for test credentials)');
                  } else if (error.code === 'auth/invalid-email') {
                    console.log('✅ GOOD: Auth is working (invalid email is expected)');
                  } else {
                    console.log('⚠️ Unexpected error:', error.message);
                  }
                }
                
                // Test 4: Check form data
                console.log('📋 Test 4: Form data...');
                console.log('📧 Email:', formData.email || 'empty');
                console.log('🔑 Password:', formData.password ? 'has value' : 'empty');
                
                console.log('🧪 === TEST COMPLETE ===');
              }}
            >
              🧪 Test Firebase
            </button>
          </div>
          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
            <Link to="/" className="back-to-landing">
              <FaArrowLeft /> Back to Landing
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
