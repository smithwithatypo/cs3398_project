// routes/seedRoutes.js
import express from 'express';
import { seedDatabase } from '../controllers/seedController.js';

const router = express.Router();

// This route will accept JSON data from the frontend
router.post('/seed', seedDatabase);

export default router;
