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

// CORS configuration for production + development
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/pledge', pledgeRoutes);
app.use('/api/footprint', footprintRoutes);
app.use('/api/challenges', challengeRoutes);

// Only connect DB and listen when NOT on Vercel
// On Vercel, api/index.js handles DB connection per cold start
if (!process.env.VERCEL) {
  await connectDB();
  sequelize.sync({ alter: true }).then(() => console.log('Sequelize Models synced'));
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;


