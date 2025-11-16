import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaClock, FaFilter, FaTimes } from 'react-icons/fa';
import { recipes, categories as recipeCategories } from '../data/recipeData';
import './RecipeList.css';

const RecipeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cookingTime, setCookingTime] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  // Apply filters whenever they change
  useEffect(() => {
    let result = [...recipes];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        recipe =>
          recipe.title.toLowerCase().includes(term) ||
          recipe.ingredients.some(ing => ing.toLowerCase().includes(term)) ||
          recipe.instructions.some(step => step.toLowerCase().includes(term))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(recipe => recipe.category === selectedCategory);
    }

    // Filter by cooking time
    if (cookingTime !== 'All') {
      const [min, max] = cookingTime.split('-').map(Number);
      result = result.filter(recipe => {
        const cookTime = parseInt(recipe.cookTime);
        return max ? cookTime >= min && cookTime <= max : cookTime >= min;
      });
    }

    // Filter by difficulty
    if (difficulty !== 'All') {
      result = result.filter(recipe => recipe.difficulty === difficulty);
    }

    setFilteredRecipes(result);
  }, [searchTerm, selectedCategory, cookingTime, difficulty]);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setCookingTime('All');
    setDifficulty('All');
  };

  // Check if any filter is active
  const isFilterActive =
    searchTerm !== '' ||
    selectedCategory !== 'All' ||
    cookingTime !== 'All' ||
    difficulty !== 'All';

  return (
    <div className="recipe-list-page">
      <div className="recipe-list-header">
        <div className="container">
          <h1>Delicious Recipes</h1>
          <p className="subtitle">Discover and share amazing recipes from around the world</p>
          
          <div className="search-container">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search recipes, ingredients, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            
            <button 
              className={`filter-toggle ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> {showFilters ? 'Hide Filters' : 'Filters'}
              {isFilterActive && !showFilters && <span className="filter-badge"></span>}
            </button>
          </div>
          
          {showFilters && (
            <div className="filters-panel">
              <div className="filter-group">
                <label>Category</label>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  {recipeCategories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="filter-group">
                <label>Cooking Time</label>
                <select 
                  value={cookingTime} 
                  onChange={(e) => setCookingTime(e.target.value)}
                >
                  <option value="All">Any Time</option>
                  <option value="0-15">Quick (0-15 min)</option>
                  <option value="16-30">Medium (16-30 min)</option>
                  <option value="31-60">Long (31-60 min)</option>
                  <option value="61">Very Long (60+ min)</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Difficulty</label>
                <select 
                  value={difficulty} 
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="All">All Levels</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              
              {isFilterActive && (
                <button className="reset-filters" onClick={resetFilters}>
                  <FaTimes /> Clear All Filters
                </button>
              )}
            </div>
          )}
          
          {isFilterActive && (
            <div className="active-filters">
              <span>Filters: </span>
              {searchTerm && (
                <span className="filter-tag">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')}><FaTimes /></button>
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="filter-tag">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')}><FaTimes /></button>
                </span>
              )}
              {cookingTime !== 'All' && (
                <span className="filter-tag">
                  {cookingTime.includes('-') 
                    ? `${cookingTime} min` 
                    : `${cookingTime}+ min`}
                  <button onClick={() => setCookingTime('All')}><FaTimes /></button>
                </span>
              )}
              {difficulty !== 'All' && (
                <span className="filter-tag">
                  {difficulty}
                  <button onClick={() => setDifficulty('All')}><FaTimes /></button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="recipe-list-container">
        <div className="container">
          <div className="recipe-grid">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map(recipe => (
                <div className="recipe-card" key={recipe.id}>
                  <Link to={`/recipe/${recipe.id}`} className="recipe-image-link">
                    <div className="recipe-image">
                      <img src={recipe.image} alt={recipe.title} />
                      <div className="recipe-overlay">
                        <span className="time">
                          <FaClock /> {recipe.cookTime}
                        </span>
                        <span className="difficulty">{recipe.difficulty}</span>
                      </div>
                    </div>
                    <div className="recipe-content">
                      <h3>{recipe.title}</h3>
                      <p className="description">
                        {recipe.ingredients.slice(0, 4).join(', ')}
                        {recipe.ingredients.length > 4 ? '...' : ''}
                      </p>
                      <div className="recipe-meta">
                        <span className="category">{recipe.category}</span>
                        <span className="rating">
                          ⭐ {recipe.rating}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="no-results">
                <h3>No recipes found</h3>
                <p>Try adjusting your search or filters to find what you're looking for.</p>
                <button className="btn btn-primary" onClick={resetFilters}>
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
          
          {filteredRecipes.length > 0 && (
            <div className="pagination">
              <button className="btn btn-outline" disabled>
                Previous
              </button>
              <span className="page-info">Page 1 of 1</span>
              <button className="btn btn-outline" disabled>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      
      <section className="cta-section">
        <div className="container">
          <h2>Can't find what you're looking for?</h2>
          <p>Submit your own recipe and share it with our community of food lovers!</p>
          <button className="btn btn-primary">Submit a Recipe</button>
        </div>
      </section>
    </div>
  );
};

export default RecipeList;
