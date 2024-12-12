const { Sequelize } = require('sequelize');

// Set up the connection to the MySQL database
const sequelize = new Sequelize('ch', 'root', 'rudransh@1', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
