import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize, { connectDB } from './config/db.js';

import './models/User.js';
import './models/Article.js';
import './models/Pledge.js';
import './models/FootprintLog.js';
import './models/Challenge.js';

import authRoutes from './routes/auth.js';
import articleRoutes from './routes/articles.js';
import pledgeRoutes from './routes/pledge.js';
import footprintRoutes from './routes/footprint.js';
import challengeRoutes from './routes/challenges.js';

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: true, // Automatically reflect requesting origin
  credentials: true,
}));

app.use(express.json());

// Lazy DB connection middleware for serverless
let isConnected = false;
app.use(async (req, res, next) => {
  if (!isConnected) {
    isConnected = await connectDB();
  }
  next();
});

// Health check endpoint
app.get('/health', (req, res) => res.status(200).json({ 
  status: 'ok', 
  dbConnected: isConnected,
  message: isConnected ? 'All good' : 'DB connection failed - check Vercel environment variables'
}));

// Root endpoint just to say we're alive
app.get('/', (req, res) => res.status(200).send('Climate API is running! 🌍'));

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/pledge', pledgeRoutes);
app.use('/api/footprint', footprintRoutes);
app.use('/api/challenges', challengeRoutes);

export default app;
