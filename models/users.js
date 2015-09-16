"use strict";
// Define Users schema
module.exports = function(sequelize, DataTypes) {
    // Define columns and indexes for this table
    var Users = sequelize.define('Users', {
            username: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING
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

    return Users;
};
