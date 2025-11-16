import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHeart, FaStar, FaUsers, FaBook, FaClock, FaUtensils, FaArrowRight } from 'react-icons/fa';
import './Landing.css';

const Landing = () => {
  const features = [
    {
      icon: <FaSearch />,
      title: "Smart Search",
      description: "Find recipes by ingredients, cuisine, or dietary preferences"
    },
    {
      icon: <FaHeart />,
      title: "Save Favorites",
      description: "Keep track of your most-loved recipes in one place"
    },
    {
      icon: <FaStar />,
      title: "Ratings & Reviews",
      description: "See what others think and share your cooking experiences"
    },
    {
      icon: <FaUsers />,
      title: "Community",
      description: "Connect with fellow food enthusiasts and share tips"
    },
    {
      icon: <FaBook />,
      title: "Step-by-Step",
      description: "Clear instructions with photos for perfect results every time"
    },
    {
      icon: <FaClock />,
      title: "Time Management",
      description: "Filter recipes by prep time, cook time, and difficulty"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Recipes" },
    { number: "50,000+", label: "Home Cooks" },
    { number: "4.8/5", label: "Average Rating" },
    { number: "100+", label: "Cuisines" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Home Cook",
      content: "Recipe Finder transformed my cooking! I discover new recipes every week and my family loves it.",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Food Blogger",
      content: "The variety and quality of recipes here is unmatched. It's my go-to resource for content creation.",
      avatar: "MC"
    },
    {
      name: "Emma Wilson",
      role: "Professional Chef",
      content: "Even as a professional chef, I find inspiration here. The recipes are well-tested and reliable.",
      avatar: "EW"
    }
  ];

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Discover Your Next Favorite Recipe</h1>
            <p>Join thousands of home cooks exploring delicious recipes from around the world. From quick weeknight dinners to gourmet weekend projects.</p>
            <div className="hero-stats">
              {stats.slice(0, 2).map((stat, index) => (
                <div key={index} className="stat-item">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="hero-actions">
              <Link to="/signup" className="btn btn-primary">
                Get Started Free <FaArrowRight />
              </Link>
              <Link to="/recipes" className="btn btn-outline">
                Browse Recipes <FaUtensils />
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="food-gallery">
              <div className="food-item food-item-1">
                <img src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=300" alt="Gourmet dish" />
              </div>
              <div className="food-item food-item-2">
                <img src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300" alt="Fresh ingredients" />
              </div>
              <div className="food-item food-item-3">
                <img src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=300" alt="Cooking" />
              </div>
              <div className="food-item food-item-4">
                <img src="https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=300" alt="Dining table" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Everything You Need to Cook Better</h2>
            <p>Powerful features designed to make your cooking journey enjoyable and successful</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>What Our Community Says</h2>
            <p>Real stories from home cooks who transformed their cooking with Recipe Finder</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p>{testimonial.content}</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Culinary Adventure?</h2>
            <p>Join our community today and get access to thousands of tested recipes, cooking tips, and a supportive food community.</p>
            <div className="cta-actions">
              <Link to="/signup" className="btn btn-primary btn-large">
                Sign Up Free <FaArrowRight />
              </Link>
              <Link to="/login" className="btn btn-outline btn-large">
                Sign In <FaArrowRight />
              </Link>
            </div>
            <div className="cta-benefits">
              <span>✓ Free forever</span>
              <span>✓ No credit card required</span>
              <span>✓ Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Preview */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Recipe Finder</h3>
              <p>Your trusted companion for discovering and sharing amazing recipes.</p>
            </div>
            <div className="footer-section">
              <h4>Product</h4>
              <ul>
                <li><Link to="/recipes">Browse Recipes</Link></li>
                <li><Link to="/categories">Categories</Link></li>
                <li><Link to="/meal-planner">Meal Planner</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Recipe Finder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
