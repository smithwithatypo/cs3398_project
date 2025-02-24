import 'dotenv/config';
import fs from 'fs';
import { OpenAI } from 'openai';

// Read sample.json
const sample = JSON.parse(fs.readFileSync('sample.json', 'utf8'));
const ingredients = sample.ingredients;

// Configure OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function getRecipe() {
  try {
    const prompt = `Create a simple recipe using these ingredients: ${ingredients.join(', ')}.
      Include title, ingredients, and instructions. Format in markdown.`;
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    });

    console.log("Generated Recipe:\n");
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

getRecipe();