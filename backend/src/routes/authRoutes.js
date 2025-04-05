import express from 'express';
import { AuthController } from '../controllers/authController.js';


const router = express.Router();

router.get('/login', AuthController.getTest);
router.post('/login', AuthController.getAuth);


export default router;