// Define database details
var dbname = 'pionix_test';
var dbUser = 'postgres';
var dbPass = 'pass';
var host = 'localhost';

// Get lib
var Sequelize = require('sequelize');

// Connect to our db
var sequelize = new Sequelize(dbname, dbUser, dbPass, {
    host: host,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});


module.exports = sequelize;
