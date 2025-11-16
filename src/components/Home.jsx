import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaClock, FaUtensils, FaHeart } from 'react-icons/fa';
import heroImage from '../assets/hero-image.jpg';
import './Home.css';
const recipe1 = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
const recipe2 = 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
const recipe3 = 'https://images.unsplash.com/photo-1506084868230-bb9d95c247ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
const chef1 = 'https://randomuser.me/api/portraits/men/32.jpg';
const chef2 = 'https://randomuser.me/api/portraits/women/44.jpg';
const chef3 = 'https://randomuser.me/api/portraits/men/75.jpg';

const Home = () => {
  const featuredRecipes = [
    {
      id: 1,
      title: 'Creamy Garlic Pasta',
      image: recipe1,
      time: '25 min',
      category: 'Italian',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Avocado Toast',
      image: recipe2,
      time: '10 min',
      category: 'Breakfast',
      rating: 4.5
    },
    {
      id: 3,
      title: 'Chocolate Cake',
      image: recipe3,
      time: '60 min',
      category: 'Dessert',
      rating: 4.9
    }
  ];

  const popularCategories = [
    { name: 'Breakfast', count: 156 },
    { name: 'Lunch', count: 234 },
    { name: 'Dinner', count: 189 },
    { name: 'Desserts', count: 145 },
    { name: 'Vegan', count: 98 },
    { name: 'Keto', count: 112 },
    { name: 'Italian', count: 176 },
    { name: 'Asian', count: 134 }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Home Cook',
      text: 'I found amazing recipes that my whole family loves. The instructions are so easy to follow!',
      image: chef1
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Food Blogger',
      text: 'As a food blogger, I appreciate the variety and quality of recipes. My audience loves them!',
      image: chef2
    },
    {
      id: 3,
      name: 'Emma Wilson',
      role: 'Professional Chef',
      text: 'Great resource for both beginners and professionals. The recipes are well-tested and delicious.',
      image: chef3
    }
  ];

  return (
    <div className="home">
      {/* Search Section - Below Navbar */}
      <section className="search-section">
        <div className="container">
          <div className="search-bar">
            <input type="text" placeholder="Search for recipes, ingredients, or categories..." />
            <button className="search-btn">
              <FaSearch /> Search
            </button>
          </div>
          <div className="popular-tags">
            <span>Popular: </span>
            {['Pasta', 'Chicken', 'Dessert', 'Vegetarian', 'Quick Meals'].map((tag, index) => (
              <a href={`/recipes?q=${tag.toLowerCase()}`} key={index} className="tag">
                {tag}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover & Share Amazing Recipes</h1>
          <p>Find the perfect recipe for any occasion, from quick weeknight dinners to impressive desserts.</p>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Delicious food" />
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="featured-recipes">
        <div className="container">
          <h2 className="section-title">Featured Recipes</h2>
          <div className="recipe-grid">
            {featuredRecipes.map((recipe) => (
              <div className="recipe-card" key={recipe.id}>
                <div className="recipe-image">
                  <img src={recipe.image} alt={recipe.title} />
                  <div className="recipe-time">
                    <FaClock /> {recipe.time}
                  </div>
                  <button className="favorite-btn">
                    <FaHeart />
                  </button>
                </div>
                <div className="recipe-info">
                  <span className="recipe-category">{recipe.category}</span>
                  <h3>{recipe.title}</h3>
                  <div className="recipe-meta">
                    <span className="rating">
                      ⭐ {recipe.rating}
                    </span>
                    <Link to={`/recipe/${recipe.id}`} className="view-recipe">
                      View Recipe →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/recipes" className="btn btn-primary">
              View All Recipes
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <div className="categories-grid">
            {popularCategories.map((category, index) => (
              <Link 
                to={`/recipes?category=${category.name.toLowerCase()}`} 
                className="category-card" 
                key={index}
              >
                <div className="category-icon">
                  <FaUtensils />
                </div>
                <h3>{category.name}</h3>
                <p>{category.count} recipes</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Find a Recipe</h3>
              <p>Browse our collection of delicious recipes or use the search to find exactly what you're craving.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Gather Ingredients</h3>
              <p>Check the ingredient list and make sure you have everything you need before you start cooking.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Cook & Enjoy</h3>
              <p>Follow the step-by-step instructions to create a delicious meal that will impress everyone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div className="testimonial-card" key={testimonial.id}>
                <div className="testimonial-content">
                  <p>"{testimonial.text}"</p>
                </div>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} className="author-image" />
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
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Cooking?</h2>
          <p>Join our community of food lovers and discover amazing recipes today!</p>
          <div className="cta-buttons">
            <Link to="/recipes" className="btn btn-primary">
              Browse Recipes
            </Link>
            <Link to="/signup" className="btn btn-outline">
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
