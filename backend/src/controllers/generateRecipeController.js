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
            const metaInfo = `
                Preferred Origin: ${origin}.
                Dish Type: ${dishType}.
                Spice Level: ${spiceLevel}.
            `;
            
            const prompt = `
                You are a creative chef who can make delicious recipes with limited ingredients.
                ${metaInfo}
                Format your response in markdown with title, ingredients list, instructions, and optional tips.
            `;
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
            const metaInfo = `
                Preferred Origin: ${origin}.
                Spice Level: ${spiceLevel}.
                Time Frame: ${timeFrame}.
            `;

            const systemPrompt = `
                You are a creative chef who can create delicious recipes based on descriptions or available ingredients.
                ${metaInfo}
                Format your response in markdown with a title, ingredients list with measurements, and detailed instructions.
            `;
            
            const response = await RecipeGeneratingService.generateRecipeFromText(systemPrompt, textPrompt);
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