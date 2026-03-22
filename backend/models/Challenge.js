import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Challenge = sequelize.define('Challenge', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    xp_reward: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 10 },
    icon: { type: DataTypes.STRING, defaultValue: 'Leaf' }
});

export default Challenge;
