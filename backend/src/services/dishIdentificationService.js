import OpenAI from 'openai';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import os from 'os';
dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: API_KEY });

const MODEL_CHOICE = "gpt-4o";
const temperature = 0.7; 

// Unified system prompt for consistent markdown formatting
const unifiedSystemPrompt = `
    You are a culinary expert who provides recipes with a structured markdown format.
    Format the recipe as follows:
    - The recipe title should be marked with a single '#' symbol.
    - The sections "Ingredients", "Instructions", and "Tips" should be marked with '##'.
    - Do not use any other heading levels.
    - Use bullet points for ingredients.
    - Use numbered steps for instructions.
    - Ensure the recipe is formatted consistently as specified.
`;

const DishIdentificationService = {
    async identifyDishFromImage(imageFile) {
        try {
            const tempDir = os.tmpdir();
            const tempFilePath = path.join(tempDir, imageFile.originalname);

            await fs.promises.writeFile(tempFilePath, imageFile.buffer);
            const imageBuffer = await fs.promises.readFile(tempFilePath);
            const base64Image = imageBuffer.toString('base64');

            const response = await openai.chat.completions.create({
                model: MODEL_CHOICE,
                temperature: temperature,
                messages: [
                    {
                        role: "system",
                        content: unifiedSystemPrompt
                    },
                    {
                        role: "user",
                        content: `Identify the dish from this image and provide a recipe formatted as specified.`
                    },
                    {
                        role: "user",
                        content: {
                            type: "image_url",
                            image_url: {
                                url: `data:image/jpeg;base64,${base64Image}`
                            }
                        }
                    }
                ],
                max_tokens: 1500
            });

            await fs.promises.unlink(tempFilePath);

            let recipe = response.choices[0].message.content;

            return recipe;
        } catch (error) {
            console.error('Error identifying dish from image:', error);
            throw error;
        }
    }
};

export { DishIdentificationService };