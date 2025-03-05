import express from 'express';
import { TestController } from '../controllers/testController.js';
import { GenerateRecipeController } from '../controllers/generateRecipeController.js';

const router = express.Router();

// routes
router.get('/test', TestController.getTest);
router.post('/generate-text', GenerateRecipeController.getGeneratedRecipe);

export default router;