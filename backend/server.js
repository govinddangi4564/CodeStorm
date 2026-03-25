import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';

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

// ✅ SINGLE CORS CONFIG (IMPORTANT)
app.use(cors({
  origin: [
    "https://climate-change-prediction.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// DB connection
let isConnected = false;
app.use(async (req, res, next) => {
  if (!isConnected) {
    isConnected = await connectDB();
  }
  next();
});

// Routes
app.get('/', (req, res) => res.send('API running 🚀'));

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/pledge', pledgeRoutes);
app.use('/api/footprint', footprintRoutes);
app.use('/api/challenges', challengeRoutes);

export default app;