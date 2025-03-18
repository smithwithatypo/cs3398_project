import express from 'express';
import { TestController } from '../controllers/testController.js';
import { GenerateRecipeController } from '../controllers/generateRecipeController.js';
import { PantryController } from '../controllers/pantryItemsController.js';

const router = express.Router();

// Test routes
router.get('/test', TestController.getTest);
router.post('/generate-text', GenerateRecipeController.getGeneratedRecipe);

// Pantry routes
router.get('/pantry', PantryController.getPantryItems);
router.post('/pantry', PantryController.addPantryItem);
router.delete('/pantry/:index', PantryController.removePantryItem);

export default router;