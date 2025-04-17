import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: API_KEY });

const model_choice = "gpt-4o"; // Or use gpt-3.5-turbo for lower cost
const temperature = 0.7; // Consistent temperature setting for stable responses

// Unified system prompt for consistent markdown formatting
const unifiedSystemPrompt = `
    You are a culinary expert who generates well-structured recipes.
    Format the recipe as follows:
    - Title should be marked with a single '#' symbol.
    - Ingredients, Instructions, and Tips should be marked with '##'.
    - Do not use any other heading levels.
    - Include the title, ingredients list with measurements, step-by-step instructions, and optional tips or variations.
    - Use bullet points for ingredients and numbered steps for instructions.
    - Ensure consistent formatting in every response.
`;

// service
const RecipeGeneratingService = {
    async generateRecipe(prompt, clientData = unifiedSystemPrompt) {
        try {
            const completion = await openai.chat.completions.create({
                temperature: temperature,
                messages: [
                    {"role": "system", "content": clientData},
                    {"role": "user", "content": prompt}
                ],
                model: model_choice,
            });
            return completion.choices[0].message.content;
        } catch (error) {
            console.error('Error generating text:', error);
            throw error; // Re-throw to allow controller to handle it
        }
    },
    
    // New method for text-to-recipe
    async generateRecipeFromText(userPrompt, systemPrompt = unifiedSystemPrompt) {
        try {
            const completion = await openai.chat.completions.create({
                temperature: temperature,
                messages: [
                    {"role": "system", "content": systemPrompt},
                    {"role": "user", "content": userPrompt}
                ],
                model: model_choice,
            });
            return completion.choices[0].message.content;
        } catch (error) {
            console.error('Error generating recipe from text:', error);
            throw error;
        }
    }
};
async function generateRecipeImage(recipeText) {
    const imagePrompt = `Create a beautiful food recipe illustration for the following recipe: ${recipeText}. Style: clean, aesthetic, recipe card style.`;
    const imageResponse = await openai.images.generate({
        prompt: imagePrompt,
        n: 1,
        size: "512x512"
    });
}

export { RecipeGeneratingService, generateRecipeImage};
