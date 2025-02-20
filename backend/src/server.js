import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT


const corsOptions = {
    origin: "*",
    credentials: true,
  };
  
// middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes  (TODO: add more routes)
// app.use('/api/ai', aiRoutes);   // example route structure

app.get('/test', (req, res) => {
  res.send('Server is working!');
});

// entrypoint
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });