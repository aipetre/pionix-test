"use strict";
// Define Projects schema
module.exports = function(sequelize, DataTypes) {
    // Define columns and indexes for this table
    var Projects = sequelize.define('Projects', {
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            }
        },
        // Methods
        {
            classMethods: {
                associate: function (models) {
                    Projects.belongsTo(models.Users);
                }
            }
        }
    );

    return Projects;
};
