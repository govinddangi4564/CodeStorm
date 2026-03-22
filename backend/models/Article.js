import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Article = sequelize.define('Article', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.ENUM('Science', 'Policy', 'Solutions', 'News'), allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    tags: { 
        type: DataTypes.STRING, 
        get() { 
            const rawValue = this.getDataValue('tags');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(val) { this.setDataValue('tags', JSON.stringify(val)); }
    },
    views: { type: DataTypes.INTEGER, defaultValue: 0 }
});

export default Article;
