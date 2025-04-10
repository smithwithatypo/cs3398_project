// backend/src/routes/seedRoutes.js
import express from "express";
import { seedDatabase } from "../controllers/seedController.js";

const router = express.Router();

// Define the seed endpoint: POST /api/seed
router.post("/", seedDatabase);

export default router;
