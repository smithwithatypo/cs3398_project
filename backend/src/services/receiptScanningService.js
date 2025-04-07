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

const ReceiptScanningService = {
    async extractFoodItemsFromReceipt(imageFile) {
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
            
            // Analyze the image with GPT-4o
            const response = await openai.chat.completions.create({
                model: MODEL_CHOICE,
                messages: [
                    {
                        role: "system",
                        content: "You are an assistant that helps extract food items from receipts. Your task is to analyze the receipt image and extract ONLY food items, ignoring non-food items like toilet paper, cleaning supplies, etc. Return a JSON object with a single key 'foodItems' containing an array of food item strings in lowercase, with no additional information. Example format: { \"foodItems\": [\"apples\", \"milk\", \"bread\"] }"
                    },
                    {
                        role: "user",
                        content: [
                            { type: "text", text: "Please extract only the food items from this receipt." },
                            {
                                type: "image_url",
                                image_url: {
                                    url: `data:image/jpeg;base64,${base64Image}`
                                }
                            }
                        ]
                    }
                ],
                response_format: { type: "json_object" },
                max_tokens: 1000
            });
            
            // Clean up the temporary file
            await fs.promises.unlink(tempFilePath);
            
            // Parse the response and extract the food items
            const responseContent = response.choices[0].message.content;
            console.log("Raw AI response:", responseContent);
            
            try {
                const content = JSON.parse(responseContent);
                
                // Check if content contains a foodItems array directly
                if (content.foodItems && Array.isArray(content.foodItems)) {
                    return content.foodItems;
                }
                
                // Check if content contains an items array (alternative naming)
                if (content.items && Array.isArray(content.items)) {
                    return content.items;
                }
                
                // If content itself is an array, use it directly
                if (Array.isArray(content)) {
                    return content;
                }
                
                // Look for any array property in the response
                for (const key in content) {
                    if (Array.isArray(content[key])) {
                        return content[key];
                    }
                }
                
                // If we have a response but can't find a suitable array, create one from properties
                const extractedItems = [];
                if (typeof content === 'object' && content !== null) {
                    for (const key in content) {
                        if (typeof content[key] === 'string') {
                            extractedItems.push(content[key]);
                        }
                    }
                    
                    if (extractedItems.length > 0) {
                        return extractedItems;
                    }
                }
                
                throw new Error('Could not find any food items in the AI response');
            } catch (parseError) {
                console.error('Error parsing AI response:', parseError);
                
                // If JSON parsing fails, try to extract items using regex
                const itemMatches = responseContent.match(/["']?[\w\s]+(["']?\s*[:,]\s*["']?[\w\s]+["']?)?/g);
                if (itemMatches && itemMatches.length > 0) {
                    // Clean up matches and filter out non-food items or meta text
                    const possibleItems = itemMatches
                        .map(item => item.replace(/["':,]/g, '').trim())
                        .filter(item => 
                            item.length > 1 && 
                            !item.includes('food') && 
                            !item.includes('items') && 
                            !item.includes('receipt')
                        );
                    
                    if (possibleItems.length > 0) {
                        return possibleItems;
                    }
                }
                
                throw new Error('Invalid response format from AI service');
            }
        } catch (error) {
            console.error('Error extracting food items from receipt:', error);
            throw error;
        }
    }
};

export { ReceiptScanningService };