import express from 'express';
import { TestController } from '../controllers/testController.js';
import { GenerateRecipeController } from '../controllers/generateRecipeController.js';
import { PantryController } from '../controllers/pantryItemsController.js';

const router = express.Router();

// Test routes
router.get('/test', TestController.getTest);
router.post('/generate-text', GenerateRecipeController.getGeneratedRecipe);

// Pantry routes
router.get('/api/pantry', PantryController.getPantryItems);
router.post('/api/pantry', PantryController.addPantryItem);
router.delete('/api/pantry/:index', PantryController.removePantryItem);

export default router;