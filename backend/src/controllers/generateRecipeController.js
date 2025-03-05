import { TextGeneratingService } from '../services/generateRecipeService.js';


const GenerateRecipeController = {
    async getGeneratedRecipe(req, res) {
        try {
            const prompt = "be a helpful assistant";
            const response = await GenerateRecipeService.generateRecipe(prompt, clientData);
            res.status(200).json({ success: true, data: response });
        } catch (error) {
            console.error('Error in GenerateRecipeController:', error);
            res.status(500).json({ success: false, error: "Failed to generate text." });
        }
    }
}

export { GenerateRecipeController }