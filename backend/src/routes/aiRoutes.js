import express from 'express';
import { TestController } from '../controllers/testController.js';
import { GenerateRecipeController } from '../controllers/generateRecipeController.js';
import { PantryController } from '../controllers/pantryItemsController.js';
import { RecipeSearchController } from '../controllers/recipeSearchController.js';

const router = express.Router();

// Test routes
router.get('/test', TestController.getTest);
router.post('/generate-text', GenerateRecipeController.getGeneratedRecipe);

// Recipe generation routes
router.post('/generate-recipe', GenerateRecipeController.generateFromPantryItems);
router.post('/generate-recipe-text', GenerateRecipeController.generateFromText); // New text-to-recipe route

// Pantry routes
router.get('/pantry', PantryController.getPantryItems);
router.post('/pantry', PantryController.addPantryItem);
router.delete('/pantry/:index', PantryController.removePantryItem);

// Cookbook routes
router.post('/search-recipes', RecipeSearchController.searchRecipes);
router.get('/recipes/:id', RecipeSearcgController.getRecipeDetails);

export default router;