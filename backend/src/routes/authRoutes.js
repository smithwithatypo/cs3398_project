import express from 'express';
import { AuthController } from '../controllers/authController.js';


const router = express.Router();

router.get('/login', AuthController.getTest);
router.post('/login', AuthController.getAuth);


export default router;



// import express from 'express';
// import { registerUser, loginUser, getTest } from '../controllers/authController.js';


// const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.get("/test", getTest);


// export default router;