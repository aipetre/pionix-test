"use strict";

// Define database details
var dbname = 'pionix_test';
var dbUser = 'postgres';
var dbPass = 'pass';
var host = 'localhost';

var fs        = require("fs");
var path      = require("path");

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

var db = {};

// Go through each defined model and create db, if not already existent
fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });


Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
