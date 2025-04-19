import axios from 'axios';

const CookbookService = {
  async searchRecipes({ query, ingredients }) {
    try {
      // If a query is provided, use TheMealDB API
      if (query && !ingredients) {
        return await this.searchRecipesByName(query);
      }
      
      if (ingredients && !query) {
        return await this.searchRecipesByIngredients(ingredients);
      }
      return [];
    } catch (error) {
      console.error('API error:', error);a
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
  async searchRecipesByIngredients(ingredients) {
    try {
      const ingredientString = ingredients.join(',');
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredientString)}`
      );

      if (!response.data.meals) {
        return [];
      }

      return response.data.meals.map(meal => ({
        id: meal.idMeal,
        name: meal.strMeal,
        description: 'Click to view full instructions.',
        image: meal.strMealThumb
      }));
    } catch (error) {
      console.error('TheMealDB API error (ingredient search):', error);
      throw new Error('Failed to fetch recipes by ingredients from TheMealDB');
    }
  }
};

export { CookbookService };