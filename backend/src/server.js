import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import aiRoutes from './routes/aiRoutes.js'
import authRoutes from './routes/authRoutes.js'
import seedRoutes from './routes/seedRoutes.js';
import connectDB from "../db.js";
import dotenv from 'dotenv';
dotenv.config();


const app = express();

// Use express JSON middleware to parse request bodies
app.use(express.json());

// Configure CORS to accept requests from the Vite dev server at localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173", // allow Vite front-end
    credentials: true,
  })
);

// Connect to the database
connectDB();

// Mount routes – here, your auth routes
app.use("/api/auth", authRoutes);
app.use("/api/seed", seedRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
