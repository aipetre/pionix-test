// Get connection to Database.
var db = require('./myDb.js');

// Get lib
var Sequelize = require('sequelize');

// Define columns and indexes for this table
var Users = db.define('Users', {
    username: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    firstName: Sequelize.STRING,
    lastNAme: Sequelize.STRING
    },
    // Indexes
    {
    indexes: [
        // Create a unique index on username
        {
            unique: true,
            fields: ['username']
        }
    ]
}
);

// Create table if not existing
Users.sync().then(function () {

    Users.findAll().then(function (result) {
        if (!result[0]) {
            // Create a user if none.
            Users.create({
                username: 'ionut_petre33@yahoo.com',
                password: 'pass',
                firstName: 'Ionut',
                lastName: 'Petre'
            });
        }
    });
});

module.exports = Users;
