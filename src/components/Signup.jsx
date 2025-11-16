import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { signup, currentUser } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      const from = location.state?.from?.pathname || '/home';
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, location]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.displayName) {
      newErrors.displayName = 'Name is required';
    } else if (formData.displayName.length < 2) {
      newErrors.displayName = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    // Clear previous errors
    setErrors({});
    setAuthError('');
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      console.log('Attempting signup with:', formData.email);
      const result = await signup(formData.email, formData.password, formData.displayName);
      console.log('Signup successful:', result);
      
      // Show success message briefly before redirect
      setAuthError('Account created successfully! Redirecting...');
      
      // Wait a moment for auth state to update, then check and redirect
      setTimeout(() => {
        console.log('Current user after signup:', currentUser);
        
        if (currentUser) {
          const from = location.state?.from?.pathname || '/home';
          console.log('Navigating to:', from);
          navigate(from, { replace: true });
        } else {
          // If not logged in, redirect to login page
          console.log('User not authenticated, redirecting to login');
          navigate('/login', { 
            state: { 
              message: 'Account created successfully! Please log in.',
              email: formData.email 
            } 
          });
        }
      }, 2000);
    } catch (error) {
      console.error('Signup error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Handle specific Firebase errors
      let errorMessage = 'Failed to create account. Please try again.';
      
      if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Email/Password authentication is not enabled in Firebase. Please enable it in the Firebase console.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please choose a stronger password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many signup attempts. Please try again later.';
      }
      
      setAuthError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, text: '', color: '#ddd' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z\d]/.test(password)) score++;
    
    const strengthLevels = [
      { score: 0, text: 'Very Weak', color: '#e74c3c' },
      { score: 2, text: 'Weak', color: '#f39c12' },
      { score: 3, text: 'Fair', color: '#f1c40f' },
      { score: 4, text: 'Good', color: '#2ecc71' },
      { score: 5, text: 'Strong', color: '#27ae60' },
      { score: 6, text: 'Very Strong', color: '#27ae60' }
    ];
    
    return strengthLevels[Math.min(score, 5)];
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Create Account</h2>
          <p>Join Recipe Finder and start your culinary journey</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="displayName">Full Name</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={errors.displayName ? 'error' : ''}
              />
            </div>
            {errors.displayName && <span className="error-message">{errors.displayName}</span>}
          </div>

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
                placeholder="Create a strong password"
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
            {formData.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className="strength-fill" 
                    style={{ 
                      width: `${(passwordStrength.score / 6) * 100}%`,
                      backgroundColor: passwordStrength.color 
                    }}
                  ></div>
                </div>
                <span className="strength-text" style={{ color: passwordStrength.color }}>
                  {passwordStrength.text}
                </span>
              </div>
            )}
            {errors.password && <span className="error-message">{errors.password}</span>}
            <div className="password-requirements">
              <p>Password must contain:</p>
              <ul>
                <li className={formData.password.length >= 8 ? 'valid' : ''}>
                  At least 8 characters
                </li>
                <li className={/[a-z]/.test(formData.password) ? 'valid' : ''}>
                  One lowercase letter
                </li>
                <li className={/[A-Z]/.test(formData.password) ? 'valid' : ''}>
                  One uppercase letter
                </li>
                <li className={/\d/.test(formData.password) ? 'valid' : ''}>
                  One number
                </li>
              </ul>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={errors.confirmPassword ? 'error' : ''}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          {authError && (
  <div className="auth-error" style={{ 
    color: authError.includes('success') ? '#27ae60' : '#e74c3c',
    backgroundColor: authError.includes('success') ? '#d4edda' : '#f8d7da',
    border: `1px solid ${authError.includes('success') ? '#c3e6cb' : '#f5c6cb'}`,
    padding: '10px 15px',
    borderRadius: '5px',
    marginBottom: '15px'
  }}>
    {authError}
  </div>
)}

          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" name="terms" required />
              <span className="checkmark"></span>
              I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>

          <button
            type="submit"
            className="signup-btn"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="signup-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="login-link">
              Sign in
            </Link>
          </p>
        </div>

        <div className="social-login">
          <p>Or sign up with</p>
          <div className="social-buttons">
            <button className="social-btn google-btn">
              <span>Google</span>
            </button>
            <button className="social-btn facebook-btn">
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
