import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import aiRoutes from './routes/aiRoutes.js'
import authRoutes from './routes/authRoutes.js'
import seedRoutes from './routes/seedRoutes.js';
import connectDB from "../db.js";
// env
import dotenv from 'dotenv';
dotenv.config();

// init express
const app = express();
const port = process.env.PORT;

// CORS
const corsOptions = {
    origin: "*",
    credentials: true,
  };
  
// middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();
// Use the seed routes
app.use('/api', seedRoutes); // This will create a POST endpoint at /api/seed
// routes
app.use('/api/ai', aiRoutes);
app.use('/api/', authRoutes);

// test 
app.get('/test', (req, res) => {
  res.send('Server is working!');
});

// entrypoint
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });