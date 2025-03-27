import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const model_choice = "gpt-4o"; // Or gpt-3.5-turbo for lower cost