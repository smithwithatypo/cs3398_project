import { IngredientReplacementService } from '../services/ingredientReplacementService.js';

const IngredientReplacementController = {
  async getReplacements(req, res) {
    const ingredient = req.body.ingredient;

    if (!ingredient || !ingredient.trim()) {
      return res.status(400).json({ 
        success: false, 
        error: "No ingredient provided." 
      });
    }

    const systemPrompt = "You are a helpful culinary assistant that suggests substitute ingredients based on common allergies, taste, and cooking properties. Respond with a short bulleted list of alternatives only.";

    const replacements = await IngredientReplacementService.generateReplacements(systemPrompt, ingredient);
    res.status(200).json({ success: true, data: replacements });
  }
};

export { IngredientReplacementController };