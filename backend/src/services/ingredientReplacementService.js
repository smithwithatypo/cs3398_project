import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const model_choice = "gpt-4o"; // Or gpt-3.5-turbo for lower cost

const IngredientReplacementService = {
  async generateReplacements(systemPrompt, ingredient) {
    try {
      const completion = await openai.chat.completions.create({
        temperature: 0.7,
        model: model_choice,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `What can I use instead of ${ingredient}?` }
        ],
      });

      const text = completion.choices[0].message.content;

      // Turn bullet list into array
      const replacements = text
        .split('\n')
        .map(line => line.replace(/^[-•*]\s*/, '').trim())
        .filter(line => line.length > 0);

      return replacements;
    } catch (error) {
      console.error('Error in IngredientReplacementService:', error);
      throw error;
    }
  }
};

export { IngredientReplacementService };