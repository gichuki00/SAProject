import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaClock, FaUtensils, FaUserFriends, FaRegClock, FaRegBookmark, FaBookmark, FaShareAlt, FaPrint, FaRegHeart, FaHeart, FaRegStar, FaStar, FaArrowLeft } from 'react-icons/fa';
import { recipes } from '../data/recipeData';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [servings, setServings] = useState(1);

  useEffect(() => {
    // Find the recipe by ID
    const foundRecipe = recipes.find(r => r.id === parseInt(id));
    
    if (foundRecipe) {
      setRecipe(foundRecipe);
      setRating(foundRecipe.rating);
      // Set default servings to the recipe's default
      setServings(foundRecipe.servings || 1);
    } else {
      // Redirect to 404 or recipes page if recipe not found
      navigate('/recipes');
    }
    
    // Check if recipe is saved/favorited (would come from user data in a real app)
    // This is just for demo purposes
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    setIsSaved(savedRecipes.includes(parseInt(id)));
    
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setIsFavorite(favoriteRecipes.includes(parseInt(id)));
    
    // Get user's previous rating (if any)
    const userRatings = JSON.parse(localStorage.getItem('userRatings') || '{}');
    if (userRatings[id]) {
      setUserRating(userRatings[id]);
    }
  }, [id, navigate]);

  const handleSaveRecipe = () => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    
    if (isSaved) {
      const updatedRecipes = savedRecipes.filter(recipeId => recipeId !== parseInt(id));
      localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
    } else {
      localStorage.setItem('savedRecipes', JSON.stringify([...savedRecipes, parseInt(id)]));
    }
    
    setIsSaved(!isSaved);
  };

  const handleFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    
    if (isFavorite) {
      const updatedFavorites = favoriteRecipes.filter(recipeId => recipeId !== parseInt(id));
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, parseInt(id)]));
    }
    
    setIsFavorite(!isFavorite);
  };

  const handleRating = (newRating) => {
    setUserRating(newRating);
    
    // Update user's rating in localStorage
    const userRatings = JSON.parse(localStorage.getItem('userRatings') || '{}');
    userRatings[id] = newRating;
    localStorage.setItem('userRatings', JSON.stringify(userRatings));
    
    // In a real app, you would send this rating to your backend
    console.log(`User rated recipe ${id} with ${newRating} stars`);
  };

  const adjustServings = (change) => {
    const newServings = servings + change;
    if (newServings > 0) {
      setServings(newServings);
    }
  };

  const printRecipe = () => {
    window.print();
  };

  const shareRecipe = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: recipe.title,
          text: `Check out this delicious recipe: ${recipe.title}`,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (!recipe) {
    return <div className="loading">Loading recipe...</div>;
  }

  // Calculate ingredient quantities based on servings
  const parseFraction = (fractionStr) => {
    // Handle whole numbers
    if (!fractionStr.includes('/')) {
      return parseFloat(fractionStr);
    }
    
    // Handle simple fractions like "1/2"
    const parts = fractionStr.split('/');
    if (parts.length === 2) {
      const numerator = parseFloat(parts[0]);
      const denominator = parseFloat(parts[1]);
      if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
        return numerator / denominator;
      }
    }
    
    // Fallback to 0 if parsing fails
    return 0;
  };

  const getAdjustedIngredient = (ingredient) => {
    // This is a simple implementation that assumes the first number in the string is the quantity
    // In a real app, you'd want a more robust solution
    const match = ingredient.match(/([\d/\s]+)\s*(.*)/);
    
    if (!match) return ingredient;
    
    const [, quantity, name] = match;
    
    try {
      // This is a very basic implementation and might not work with all fraction formats
      // Parse fractions safely without eval
      const originalQuantity = parseFraction(quantity.trim());
      const adjustedQuantity = (originalQuantity / (recipe.servings || 1)) * servings;
      
      // Format the number to a readable fraction
      const formattedQuantity = Number.isInteger(adjustedQuantity) 
        ? adjustedQuantity 
        : adjustedQuantity.toFixed(1).replace(/\.0$/, '');
      
      return `${formattedQuantity} ${name}`;
    } catch (e) {
      // If there's an error parsing the quantity, return the original ingredient
      return ingredient;
    }
  };

  return (
    <div className="recipe-detail">
      <div className="recipe-header">
        <div className="container">
          <button onClick={() => navigate(-1)} className="back-button">
            <FaArrowLeft /> Back to Recipes
          </button>
          
          <div className="recipe-meta">
            <div className="meta-item">
              <FaClock />
              <span>{recipe.prepTime} prep • {recipe.cookTime} cook</span>
            </div>
            <div className="meta-item">
              <FaUtensils />
              <span>{recipe.difficulty}</span>
            </div>
            <div className="meta-item">
              <FaUserFriends />
              <span>{servings} {servings === 1 ? 'serving' : 'servings'}</span>
            </div>
          </div>
          
          <h1>{recipe.title}</h1>
          
          <div className="recipe-actions">
            <button 
              className={`action-btn ${isFavorite ? 'active' : ''}`}
              onClick={handleFavorite}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
              <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
            </button>
            
            <button 
              className={`action-btn ${isSaved ? 'active' : ''}`}
              onClick={handleSaveRecipe}
              aria-label={isSaved ? 'Remove from saved recipes' : 'Save recipe'}
            >
              {isSaved ? <FaBookmark /> : <FaRegBookmark />}
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
            
            <button className="action-btn" onClick={shareRecipe} aria-label="Share recipe">
              <FaShareAlt />
              <span>Share</span>
            </button>
            
            <button className="action-btn print-only" onClick={printRecipe} aria-label="Print recipe">
              <FaPrint />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="recipe-content">
        <div className="container">
          <div className="recipe-grid">
            <div className="recipe-image">
              <img src={recipe.image} alt={recipe.title} />
              
              <div className="recipe-rating">
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`star ${star <= (userRating || rating) ? 'active' : ''}`}
                      onClick={() => handleRating(star)}
                      onMouseEnter={() => setUserRating(star)}
                      onMouseLeave={() => setUserRating(0)}
                      aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                    >
                      {star <= (userRating || rating) ? <FaStar /> : <FaRegStar />}
                    </button>
                  ))}
                </div>
                <span className="rating-value">{rating.toFixed(1)}</span>
                <span className="rating-count">(24 reviews)</span>
              </div>
            </div>
            
            <div className="recipe-details">
              <div className="tabs">
                <button 
                  className={`tab ${activeTab === 'ingredients' ? 'active' : ''}`}
                  onClick={() => setActiveTab('ingredients')}
                >
                  Ingredients
                </button>
                <button 
                  className={`tab ${activeTab === 'instructions' ? 'active' : ''}`}
                  onClick={() => setActiveTab('instructions')}
                >
                  Instructions
                </button>
                <button 
                  className={`tab ${activeTab === 'nutrition' ? 'active' : ''}`}
                  onClick={() => setActiveTab('nutrition')}
                >
                  Nutrition
                </button>
              </div>
              
              <div className="tab-content">
                {activeTab === 'ingredients' && (
                  <div className="ingredients-section">
                    <div className="serving-controls">
                      <span>Servings:</span>
                      <div className="serving-buttons">
                        <button 
                          onClick={() => adjustServings(-1)}
                          disabled={servings <= 1}
                          aria-label="Decrease servings"
                        >
                          -
                        </button>
                        <span>{servings}</span>
                        <button 
                          onClick={() => adjustServings(1)}
                          aria-label="Increase servings"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <h3>Ingredients</h3>
                    <ul className="ingredients-list">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="ingredient-item">
                          <input type="checkbox" id={`ingredient-${index}`} />
                          <label htmlFor={`ingredient-${index}`}>
                            {getAdjustedIngredient(ingredient)}
                          </label>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="cooking-time">
                      <FaRegClock />
                      <div>
                        <h4>Total Time</h4>
                        <p>{recipe.prepTime} prep • {recipe.cookTime} cook</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'instructions' && (
                  <div className="instructions-section">
                    <h3>Instructions</h3>
                    <ol className="instructions-list">
                      {recipe.instructions.map((step, index) => (
                        <li key={index} className="instruction-step">
                          <div className="step-number">{index + 1}</div>
                          <div className="step-text">{step}</div>
                        </li>
                      ))}
                    </ol>
                    
                    <div className="recipe-notes">
                      <h4>Chef's Notes</h4>
                      <p>
                        This {recipe.title.toLowerCase()} is a {recipe.difficulty.toLowerCase()} recipe that serves {recipe.servings}. 
                        It's perfect for {recipe.category.toLowerCase()} and can be easily adjusted to your taste preferences.
                      </p>
                    </div>
                  </div>
                )}
                
                {activeTab === 'nutrition' && (
                  <div className="nutrition-section">
                    <h3>Nutrition Information</h3>
                    <p>Nutritional information is approximate and may vary based on specific ingredients used.</p>
                    
                    <div className="nutrition-facts">
                      <div className="nutrition-item">
                        <span className="label">Calories</span>
                        <span className="value">450 kcal</span>
                      </div>
                      <div className="nutrition-item">
                        <span className="label">Protein</span>
                        <span className="value">25g</span>
                      </div>
                      <div className="nutrition-item">
                        <span className="label">Carbohydrates</span>
                        <span className="value">60g</span>
                      </div>
                      <div className="nutrition-item">
                        <span className="label">Fat</span>
                        <span className="value">15g</span>
                      </div>
                      <div className="nutrition-item">
                        <span className="label">Fiber</span>
                        <span className="value">8g</span>
                      </div>
                      <div className="nutrition-item">
                        <span className="label">Sugar</span>
                        <span className="value">12g</span>
                      </div>
                    </div>
                    
                    <div className="allergens">
                      <h4>Allergens</h4>
                      <div className="allergen-tags">
                        <span className="allergen-tag">Gluten</span>
                        <span className="allergen-tag">Dairy</span>
                        <span className="allergen-tag">Eggs</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="related-recipes">
            <h2>You May Also Like</h2>
            <div className="related-grid">
              {recipes
                .filter(r => r.id !== recipe.id)
                .slice(0, 3)
                .map(related => (
                  <Link to={`/recipe/${related.id}`} key={related.id} className="related-card">
                    <img src={related.image} alt={related.title} />
                    <h3>{related.title}</h3>
                    <div className="related-meta">
                      <span>{related.category}</span>
                      <span>⭐ {related.rating}</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
