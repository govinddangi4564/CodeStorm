import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const FootprintLog = sequelize.define('FootprintLog', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    transport: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    energy: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    diet: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    shopping: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    total_kg_co2: { type: DataTypes.FLOAT, allowNull: false }
});

FootprintLog.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(FootprintLog, { foreignKey: 'userId', as: 'logs' });

export default FootprintLog;
