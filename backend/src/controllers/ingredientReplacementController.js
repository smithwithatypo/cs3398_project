import { IngredientReplacementService } from '../services/ingredientReplacementService.js';

const IngredientReplacementController = {
  async getReplacements(req, res) {
    try {
      const ingredient = req.body.ingredient;

      if (!ingredient || !ingredient.trim()) {
        return res.status(400).json({ 
          success: false, 
          error: "No ingredient provided." 
        });
      }

      const systemPrompt = `
        You are a helpful culinary assistant that suggests substitute ingredients based on common allergies, taste, and cooking properties.
        Respond ONLY with a short bulleted list of food-based alternatives.
        If the input is not a valid food ingredient (e.g. bleach, books), respond only with:
        "This is not a food item."
      `;

      const replacements = await IngredientReplacementService.generateReplacements(systemPrompt, ingredient);

      if (!replacements || replacements.length === 0) {
        return res.status(400).json({ 
          success: false, 
          error: "This is not a food item." 
        });
      }
      
      res.status(200).json({ success: true, data: replacements });
    } catch (error) {
      console.error('Error in IngredientReplacementController:', error);
      res.status(500).json({ success: false, error: "Failed to fetch replacements." });
    }
  }
};

export { IngredientReplacementController };