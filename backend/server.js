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
await connectDB();

// Sync models
sequelize.sync({ alter: true }).then(() => console.log('Sequelize Models synced'));

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/pledge', pledgeRoutes);
app.use('/api/footprint', footprintRoutes);
app.use('/api/challenges', challengeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
