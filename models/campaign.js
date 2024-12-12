const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user'); // Association with User model

const Campaign = sequelize.define('Campaign', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    target_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    raised_amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    organization_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Allow NULL by default
        references: {
            model: User, // Reference the User model
            key: 'id', // Reference the User's primary key
        },
    },
}, {
    timestamps: false, // Disable timestamps
});

Campaign.belongsTo(User, { foreignKey: 'organization_id' }); // A campaign belongs to an organization (user)

module.exports = Campaign;
