import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'climatedb',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connected via Sequelize');
  } catch (error) {
    console.error(`Error connecting to MySQL: ${error.message}`);
    process.exit(1);
  }
};

export default sequelize;
