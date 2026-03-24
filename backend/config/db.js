import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'climatedb',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
    dialectOptions: {
      connectTimeout: 10000,
    },
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connected via Sequelize');
    return true;
  } catch (error) {
    console.error(`Error connecting to MySQL: ${error.message}`);
    // DO NOT exit process here, it crashes Vercel serverless
    return false;
  }
};

export default sequelize;
