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
  async searchRecipesByIngredients(ingredient) {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
      );

      if (!response.data.meals) {
        return [];
      }

      const fullMeals = await Promise.all(
        response.data.meals.map(async (meal) => {
          const mealDetailsResponse = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
          );
          const fullMeal = mealDetailsResponse.data.meals[0];
  
          return {
            id: fullMeal.idMeal,
            name: fullMeal.strMeal,
            fullInstructions: fullMeal.strInstructions,
            description: fullMeal.strInstructions.substring(0, 150) + '...'
              ? fullMeal.strInstructions.substring(0, 150) + '...'
              : 'No description available.',
            image: fullMeal.strMealThumb,
            area: fullMeal.strArea,
            category: fullMeal.strCategory
          };
        })
      );
  
      return fullMeals;
    } catch (error) {
      console.error('TheMealDB API error (ingredient search):', error);
      throw new Error('Failed to fetch recipes by ingredients from TheMealDB');
    }
  }
};

export { CookbookService };