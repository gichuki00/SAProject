import React from 'react';
import { FaUtensils, FaHeart, FaLeaf, FaUsers } from 'react-icons/fa';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>About Our Recipe Platform</h1>
          <p className="subtitle">Delicious recipes for everyone, from home cooks to professional chefs</p>
        </div>
      </section>
      
      <section className="about-mission">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                We believe that cooking is for everyone, regardless of skill level. Our mission is to make cooking 
                accessible, enjoyable, and rewarding for home cooks of all abilities. We provide tested recipes, 
                how-to guides, and cooking inspiration to help you create delicious meals every day.
              </p>
              <p>
                Founded in 2023, our platform has grown into a vibrant community of food lovers sharing their passion 
                for cooking. Whether you're a beginner or an experienced cook, we have something for you.
              </p>
            </div>
            <div className="mission-stats">
              <div className="stat-item">
                <FaUtensils className="stat-icon" />
                <div className="stat-number">500+</div>
                <div className="stat-label">Recipes</div>
              </div>
              <div className="stat-item">
                <FaHeart className="stat-icon" />
                <div className="stat-number">50K+</div>
                <div className="stat-label">Happy Cooks</div>
              </div>
              <div className="stat-item">
                <FaLeaf className="stat-icon" />
                <div className="stat-number">200+</div>
                <div className="stat-label">Vegan Recipes</div>
              </div>
              <div className="stat-item">
                <FaUsers className="stat-icon" />
                <div className="stat-number">100+</div>
                <div className="stat-label">Expert Chefs</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="about-team">
        <div className="container">
          <h2>Meet Our Team</h2>
          <p className="section-subtitle">Passionate foodies dedicated to bringing you the best recipes</p>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <div className="placeholder-avatar">JD</div>
              </div>
              <h3>John Doe</h3>
              <p className="member-role">Head Chef</p>
              <p className="member-bio">
                With over 15 years of culinary experience, John creates recipes that are both delicious and approachable.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <div className="placeholder-avatar">AS</div>
              </div>
              <h3>Anna Smith</h3>
              <p className="member-role">Nutritionist</p>
              <p className="member-bio">
                Anna ensures all our recipes are not just tasty but also nutritious and balanced for a healthy lifestyle.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <div className="placeholder-avatar">MJ</div>
              </div>
              <h3>Mike Johnson</h3>
              <p className="member-role">Photographer</p>
              <p className="member-bio">
                Mike's food photography makes our recipes come to life and inspires people to get cooking.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="about-values">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <FaHeart />
              </div>
              <h3>Quality</h3>
              <p>We test every recipe multiple times to ensure perfect results every time you cook.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <FaLeaf />
              </div>
              <h3>Sustainability</h3>
              <p>We promote sustainable cooking practices and ingredient sourcing.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <FaUsers />
              </div>
              <h3>Community</h3>
              <p>We believe in the power of sharing and learning from each other's culinary experiences.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="about-cta">
        <div className="container">
          <h2>Ready to start cooking?</h2>
          <p>Join our community of food lovers and discover amazing recipes today!</p>
          <a href="/recipes" className="btn btn-light">Explore Recipes</a>
        </div>
      </section>
    </div>
  );
};

export default About;
