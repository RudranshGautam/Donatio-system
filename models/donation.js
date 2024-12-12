const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Campaign = require('./campaign');

const Donation = sequelize.define(
    'Donation',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false, // Disable createdAt and updatedAt
    }
);

Donation.belongsTo(User, { foreignKey: 'user_id' });
Donation.belongsTo(Campaign, { foreignKey: 'campaign_id' });

module.exports = Donation;
