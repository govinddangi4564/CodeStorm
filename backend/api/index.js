import sequelize, { connectDB } from '../config/db.js';
import app from '../server.js';

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    await connectDB();
    await sequelize.sync({ alter: true });
    isConnected = true;
    console.log('Vercel: DB connected and models synced');
  }
  return app(req, res);
}
