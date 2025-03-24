import { SpoonacularService } from '../services/spoonacularService.js';

const RecipeSearchController = {
  async searchRecipes(req, res) {
    try {
      const { query, ingredients } = req.body;
      
      const results = await SpoonacularService.searchRecipes({
        query,
        ingredients: ingredients?.join(',')
      });

      if (results.length === 0) {
        return res.status(404).json({ 
          success: false, 
          error: 'No recipes found' 
        });
      }

      res.status(200).json({ success: true, data: results });
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message || 'Failed to search recipes' 
      });
    }
  },

  async getRecipeDetails(req, res) {
    try {
      const { id } = req.params;
      const recipe = await SpoonacularService.getRecipeDetails(id);
      res.status(200).json({ success: true, data: recipe });
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

export { RecipeSearchController };