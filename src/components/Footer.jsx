import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <h3>RecipeFinder</h3>
              <p>Discover delicious recipes from around the world. Cook with love and share your culinary creations with our community.</p>
              <div className="social-links">
                <a href="#" aria-label="Facebook"><FaFacebook /></a>
                <a href="#" aria-label="Twitter"><FaTwitter /></a>
                <a href="#" aria-label="Instagram"><FaInstagram /></a>
                <a href="#" aria-label="Pinterest"><FaPinterest /></a>
                <a href="#" aria-label="YouTube"><FaYoutube /></a>
              </div>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/recipes">Recipes</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>

            <div className="footer-categories">
              <h4>Categories</h4>
              <ul>
                <li><Link to="/recipes?category=breakfast">Breakfast</Link></li>
                <li><Link to="/recipes?category=lunch">Lunch</Link></li>
                <li><Link to="/recipes?category=dinner">Dinner</Link></li>
                <li><Link to="/recipes?category=dessert">Desserts</Link></li>
                <li><Link to="/recipes?category=vegan">Vegan</Link></li>
                <li><Link to="/recipes?category=keto">Keto</Link></li>
              </ul>
            </div>

            <div className="footer-newsletter">
              <h4>Newsletter</h4>
              <p>Subscribe to our newsletter for the latest recipes and cooking tips!</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Your email address" required />
                <button type="submit" className="btn btn-primary">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} RecipeFinder. All rights reserved.</p>
          <div className="payment-methods">
            <span>We accept:</span>
            <div className="payment-icons">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-paypal"></i>
              <i className="fab fa-cc-apple-pay"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
