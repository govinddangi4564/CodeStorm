// Local development entry point
import sequelize, { connectDB } from './config/db.js';
import app from './server.js';

await connectDB();
sequelize.sync({ alter: true }).then(() => console.log('Sequelize Models synced'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
