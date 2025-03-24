import axios from 'axios';

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

const SpoonacularService = {
  async searchRecipes({ query, ingredients }) {
    try {
      // If a query is provided, use TheMealDB API
      if (query && !ingredients) {
        return await this.searchRecipesByName(query);
      }
      
      // For ingredient search, continue using Spoonacular
      const params = {
        api_key: SPOONACULAR_API_KEY,
        number: 5, // Number of results
        addRecipeInformation: true
      };

      if (query) params.query = query;
      if (ingredients) params.includeIngredients = ingredients;

      const response = await axios.get(
        'https://api.spoonacular.com/recipes/complexSearch',
        { params }
      );
      
      return response.data.results.map(recipe => ({
        id: recipe.id,
        name: recipe.title,
        description: recipe.summary,
        image: recipe.image
      }));
    } catch (error) {
      console.error('API error:', error);
      throw new Error('Failed to fetch recipes');
    }
  },
  
  async searchRecipesByName(query) {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
      );
      
      // TheMealDB returns null instead of an empty array when no meals are found
      if (!response.data.meals) {
        return [];
      }
      
      return response.data.meals.map(meal => ({
        id: meal.idMeal,
        name: meal.strMeal,
        fullInstructions: meal.strInstructions,
        description: meal.strInstructions.substring(0, 150) + '...',
        image: meal.strMealThumb,
        area: meal.strArea,
        category: meal.strCategory
      }));
    } catch (error) {
      console.error('TheMealDB API error:', error);
      throw new Error('Failed to fetch recipes from TheMealDB');
    }
  }, 

  async getRecipeDetails(id) {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const meal = response.data.meals[0];
      return {
        id: meal.idMeal,
        name: meal.strMeal,
        fullInstructions: meal.strInstructions, // full instructions here
        image: meal.strMealThumb,
        area: meal.strArea,
        category: meal.strCategory
      };
    } catch (error) {
      console.error('TheMealDB API error:', error);
      throw new Error('Failed to fetch full recipe details');
    }
  }
};

export { SpoonacularService };