import express from 'express';

const router = express.Router();

// routes
// router.get('/example', controllerObject.method)   // example template
router.post('/generate-text', GenerateRecipeController.getGeneratedRecipe);


export default router;