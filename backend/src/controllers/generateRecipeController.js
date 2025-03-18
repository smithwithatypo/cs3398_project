import { RecipeGeneratingService } from '../services/generateRecipeService.js';

const GenerateRecipeController = {
    async getGeneratedRecipe(req, res) {
        try {
            const prompt = "be a helpful assistant";
            const clientData = req.body.ingredients || '';
            const response = await RecipeGeneratingService.generateRecipe(prompt, clientData);
            res.status(200).json({ success: true, data: response });
        } catch (error) {
            console.error('Error in GenerateRecipeController:', error);
            res.status(500).json({ success: false, error: "Failed to generate text." });
        }
    },
    
    async generateFromPantryItems(req, res) {
        try {
            const ingredients = req.body.ingredients || [];
            
            if (!ingredients.length) {
                return res.status(400).json({ 
                    success: false, 
                    error: "No ingredients provided" 
                });
            }
            
            const prompt = "You are a creative chef who can make delicious recipes with limited ingredients. Format your response in markdown.";
            const ingredientsText = ingredients.join(', ');
            
            const response = await RecipeGeneratingService.generateRecipe(prompt, ingredientsText);
            res.status(200).json({ success: true, data: response });
        } catch (error) {
            console.error('Error generating recipe from pantry items:', error);
            res.status(500).json({ 
                success: false, 
                error: "Failed to generate recipe." 
            });
        }
    }
}

export { GenerateRecipeController }