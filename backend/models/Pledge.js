import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Pledge = sequelize.define('Pledge', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    pledgeItems: { 
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('pledgeItems');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(val) { this.setDataValue('pledgeItems', JSON.stringify(val)); }
    },
    message: { type: DataTypes.TEXT }
});

Pledge.belongsTo(User, { foreignKey: 'userId', constraints: false });

export default Pledge;
