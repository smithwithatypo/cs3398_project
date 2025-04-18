import { AuthService } from '../services/authService.js';

const AuthController = {
    getTest(req, res) {
        try {
            const message = AuthService.getTestMessage();
            res.status(200).json({ success: true, message });
        } catch (error) {
            console.error('Error in AuthController:', error);
            res.status(500).json({ success: false, error: "Auth route failed." });
        }
    },

    async getAuth(req, res) {
        try {
            const clientData = req.body;
            const authCheck = AuthService.checkCredentials(clientData);
            
            if (authCheck === true) {
                res.status(200).json({ success: true });
            } else {
                res.status(200).json({ success: false });
            }
        } catch (error) {
            console.error('Error in AuthController:', error);
            res.status(500).json({ success: false, error: "Auth route failed." });
        }
    },


};

export { AuthController };




// // backend/src/controllers/authController.js
// import User from "../../database/models/User.js"; // Adjust path based on your structure
// import bcrypt from "bcrypt";
// import { AuthService } from "../services/authService.js";

// // Register a new user – hashes the password before saving.
// export async function registerUser(req, res) {
//   try {
//     const { username, email, password } = req.body;

//     // Check if a user with that email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the new user with the hashed password
//     const newUser = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({ success: true, message: "User registered successfully", user: newUser });
//   } catch (error) {
//     console.error("Error in registerUser:", error);
//     res.status(500).json({ success: false, error: "Registration failed" });
//   }
// }

// // Login endpoint – verifies the credentials using bcrypt
// export async function loginUser(req, res) {
//   try {
//     const clientData = req.body;
//     const authCheck = await AuthService.checkCredentials(clientData);
    
//     if (authCheck) {
//       res.status(200).json({ success: true });
//     } else {
//       res.status(401).json({ success: false, message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.error("Error in loginUser:", error);
//     res.status(500).json({ success: false, error: "Auth route failed." });
//   }
// }

// // A test function to ensure the service is wired up correctly.
// export function getTest(req, res) {
//   try {
//     const message = AuthService.getTestMessage();
//     res.status(200).json({ success: true, message });
//   } catch (error) {
//     console.error("Error in getTest:", error);
//     res.status(500).json({ success: false, error: "Auth route failed." });
//   }
// }
