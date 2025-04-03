import OpenAI from 'openai';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import os from 'os';
dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: API_KEY });

// Use GPT-4o for image analysis
const MODEL_CHOICE = "gpt-4o";

const DishIdentificationService = {
    async identifyDishFromImage(imageFile) {
        try {
            // Create a temporary file path
            const tempDir = os.tmpdir();
            const tempFilePath = path.join(tempDir, imageFile.originalname);
            
            // Save the uploaded file to the temp directory
            await fs.promises.writeFile(tempFilePath, imageFile.buffer);
            
            // Read the file as a buffer for the OpenAI API
            const imageBuffer = await fs.promises.readFile(tempFilePath);
            
            // Convert buffer to base64 encoding as required by OpenAI
            const base64Image = imageBuffer.toString('base64');
            
            // Analyze the image with GPT-4 Vision
            const response = await openai.chat.completions.create({
                model: MODEL_CHOICE,
                messages: [
                    {
                        role: "system",
                        content: "You are a culinary expert who can identify dishes from photos and provide recipes. When shown a food image, identify the dish, list its ingredients, and provide a detailed recipe with preparation instructions. Format your response in markdown."
                    },
                    {
                        role: "user",
                        content: [
                            { type: "text", text: "What dish is this? Please identify it and provide a recipe." },
                            {
                                type: "image_url",
                                image_url: {
                                    url: `data:image/jpeg;base64,${base64Image}`
                                }
                            }
                        ]
                    }
                ],
                max_tokens: 1500
            });
            
            // Clean up the temporary file
            await fs.promises.unlink(tempFilePath);
            
            return response.choices[0].message.content;
        } catch (error) {
            console.error('Error identifying dish from image:', error);
            throw error;
        }
    }
};

export { DishIdentificationService };