// openai config
import OpenAI from 'openai';
// const API_KEY = process.env.OPENAI_API_KEY;
const API_KEY = 'replace_this_please';
const openai = new OpenAI({ apiKey: API_KEY });

const model_choice = "gpt-4o";


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
                        Give me a recipe if I only have these ingredients:  ${clientData}
                    `}
                ],
                model: model_choice,
              });
              return completion.choices[0].message.content;
        } catch (error) {
            console.error('Error generating text:', error);
        }
    }
};

export { RecipeGeneratingService };