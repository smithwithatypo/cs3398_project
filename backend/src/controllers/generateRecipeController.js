import { RecipeGeneratingService } from '../services/generateRecipeService.js';

const GenerateRecipeController = {
    async getGeneratedRecipe(req, res) {
        try {
            const prompt = "be a helpful assistant";
            const clientData = req.body.ingredients || '';
            console.log("hit backend route for generate-recipe")
            const response = await RecipeGeneratingService.generateRecipe(prompt, clientData);
            res.status(200).json({ success: true, data: response });
        } catch (error) {
            console.error('Error in GenerateRecipeController:', error);
            res.status(500).json({ success: false, error: "Failed to generate text." });
        }
    },
    
    async generateFromPantryItems(req, res) {
        try {
            const { ingredients = [], origin = 'Any', dishType = 'Any', spiceLevel = 'Any' } = req.body;
            
            if (!ingredients.length) {
                return res.status(400).json({ 
                    success: false, 
                    error: "No ingredients provided" 
                });
            }

            const ingredientsText = ingredients.join(', ');
            const userPrompt = `
                Based on the user's ingredients: "${ingredientsText}",
                generate a recipe that fits the following preferences:
                - Origin: ${origin}
                - Dish Type: ${dishType}
                - Spice Level: ${spiceLevel}
                Ensure the recipe aligns with the cuisine and dish type, and incorporates an appropriate spice level.
                Format your response in markdown as a complete recipe.
            `;
            
            const response = await RecipeGeneratingService.generateRecipe(userPrompt);
            res.status(200).json({ success: true, data: response });
        } catch (error) {
            console.error('Error generating recipe from pantry items:', error);
            res.status(500).json({ 
                success: false, 
                error: "Failed to generate recipe." 
            });
        }
    },

    // New method for text-to-recipe
    async generateFromText(req, res) {
        try {
            const { textPrompt = '', origin = 'Any', dishType = 'Any', spiceLevel = 'Any' } = req.body;
            
            if (!textPrompt.trim()) {
                return res.status(400).json({ 
                    success: false, 
                    error: "No text prompt provided" 
                });
            }

            const userPrompt = `
                Based on the user's description: "${textPrompt}",
                generate a recipe that fits the following preferences:
                - Origin: ${origin}
                - Dish Type: ${dishType}
                - Spice Level: ${spiceLevel}
                Ensure the recipe aligns with the cuisine and dish type, and incorporates an appropriate spice level.
                Format your response in markdown as a complete recipe.
            `;
            
            const response = await RecipeGeneratingService.generateRecipeFromText(userPrompt);
            res.status(200).json({ success: true, data: response });
        } catch (error) {
            console.error('Error generating recipe from text:', error);
            res.status(500).json({ 
                success: false, 
                error: "Failed to generate recipe from text." 
            });
        }
    }
}

export { GenerateRecipeController }