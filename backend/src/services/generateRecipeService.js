import OpenAI from 'openai';

const openai = new OpenAI();
const API_KEY = process.env.OPENAI_API_KEY;

openai.apiKey = API_KEY; 

const model_choice = "gpt-4o";


const TextGeneratingService = {
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

export { TextGeneratingService };