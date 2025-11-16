import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

// Text logo component
const Logo = () => (
  <div className="text-logo">
    <span className="logo-text">Recipe</span>
    <span className="logo-highlight">Finder</span>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Don't show navbar on landing page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''} ${isOpen ? 'mobile-open' : ''}`}>
      <div className="container">
        <div className="header-container">
          <Link to="/" className="logo">
            <Logo />
          </Link>

          <nav className={`nav-links ${isOpen ? 'active' : ''}`}>
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/recipes" className="nav-link">Recipes</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>

          <div className="nav-actions">
            <button className="search-btn" aria-label="Search">
              <FaSearch />
            </button>
            {currentUser ? (
              <div className="user-menu">
                <span className="user-name">Hi, {currentUser.displayName}</span>
                <button className="logout-btn" onClick={handleLogout} aria-label="Logout">
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="auth-btn">
                  <FaUser />
                  <span>Login</span>
                </Link>
                <Link to="/signup" className="btn btn-primary btn-small">
                  Sign Up
                </Link>
              </div>
            )}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
