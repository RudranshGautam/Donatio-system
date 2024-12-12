const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import the Sequelize instance

// Define the User model
const User = sequelize.define('User', {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensures that the email is unique
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'organization'),
    defaultValue: 'user', // Default role is 'user'
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

// Sync the model with the database to create or update the table
User.sync({ alter: true }).then(() => {
  console.log('User table updated or already exists');
});

module.exports = User;
