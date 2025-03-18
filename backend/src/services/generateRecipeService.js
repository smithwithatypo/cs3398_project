import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: API_KEY });

const model_choice = "gpt-4o"; // Or use gpt-3.5-turbo for lower cost

// service
const RecipeGeneratingService = {
    async generateRecipe(prompt, clientData) {
        try {
            const temperature = 1;
            const completion = await openai.chat.completions.create({
                temperature: temperature,
                messages: [
                    {"role": "system", "content": `${prompt}`},
                    {"role": "user",   "content": `
                        Give me a recipe if I only have these ingredients: ${clientData}
                        Include a title, ingredients list with measurements, and step-by-step instructions.
                    `}
                ],
                model: model_choice,
            });
            return completion.choices[0].message.content;
        } catch (error) {
            console.error('Error generating text:', error);
            throw error; // Re-throw to allow controller to handle it
        }
    }
};

export { RecipeGeneratingService };