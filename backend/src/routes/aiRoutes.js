import express from 'express';
import { TestController } from '../controllers/testController.js';
import { GenerateRecipeController } from '../controllers/generateRecipeController.js';
import { PantryController } from '../controllers/pantryItemsController.js';
import { RecipeSearchController } from '../controllers/recipeSearchController.js';
import { IngredientReplacementController } from '../controllers/ingredientReplacementController.js';
import { DishIdentificationController } from '../controllers/dishIdentificationController.js';

const router = express.Router();

// Test routes
router.get('/test', TestController.getTest);
router.post('/generate-text', GenerateRecipeController.getGeneratedRecipe);

// Recipe generation routes
router.post('/generate-recipe', GenerateRecipeController.generateFromPantryItems);
router.post('/generate-recipe-text', GenerateRecipeController.generateFromText);

// Dish identification from image route
router.post('/identify-dish', 
    DishIdentificationController.uploadMiddleware, 
    DishIdentificationController.identifyDish
);

// Pantry routes
router.get('/pantry', PantryController.getPantryItems);
router.post('/pantry', PantryController.addPantryItem);
router.delete('/pantry/:index', PantryController.removePantryItem);

// Cookbook routes
router.post('/search-recipes', RecipeSearchController.searchRecipes);

// Ingredient Replacement
router.post('/replace-ingredient', IngredientReplacementController.getReplacements);

export default router;