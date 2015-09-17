var express = require('express');
var router = express.Router();
// Get db models.
var models  = require('../models');
var Projects = models.Projects;

/**
 * @function generateErrorCallback Returns a function that sends a 500 error response with the given error object.
 * @param res Response object
 * @returns {Function}
 */
function generateErrorCallback(res) {
    return function (err) {
        // Internal error
        // Note: Not ideal to show error
        res.status(500).send(err);
    };
}

// Retrieve all projects of an user
router.get('/',function(req,res){
    var userId = req.session.userId;
    Projects.findAndCountAll({
        where : {
            UserId: userId
        }
    }).then(
        function (result) {
            // Check results
            if (result) {
                // Send list
                res.status(200).send(result.rows);
            } else {
                // None, send empty list
                res.status(200).send([]);
            }
        },
        generateErrorCallback(res)
    );
});

// Retrieve an existing project
router.get('/:projectId',function(req,res){
    var projectId = req.params.projectId;

    Projects.findOne({
        where: {
            id: projectId,
        }
    }).then(
        function (result) {
            // Check if projects is found
            if (result) {
                // Found
                res.status(200).send(result.dataValues);
            } else {
                // Not found
                res.status(404).send();
            }
        },
        generateErrorCallback(res)
    );
});

// Create a project
router.post('/',function(req,res){
    // Get post data
    var params = req.body;
    // Add user
    params.UserId = req.session.userId;

    // Try to create
    Projects.create(params).then(
        function (result) {
            //Success, return the id of the created project
            res.status(201).send({
                projectId : result.dataValues.id
            });
        },
        generateErrorCallback(res)
    );
});

// Modify an exsisting project
router.put('/:projectId',function(req,res){
    var projectId = req.params.projectId;
    var dataTobeUpdated = req.body;

    // Retrieve first
    Projects.findOne({
        where: {
            id: projectId,
        }
    }).then(
        function (result) {
            // Check if project is found
            if (result) {
                // Found it, now update it
                result.update(dataTobeUpdated).then(
                    function () {
                        // Update succesful
                        res.send(204);
                    },
                    generateErrorCallback(res)
                );
            } else {
                // Not found
                res.status(404).send();;
            }
        },
        generateErrorCallback(res)
    );

});

// Delete an existing project
router.delete('/:projectId',function(req,res){
    var projectId = req.params.projectId;

    // Retrieve first
    Projects.findOne({
        where: {
            id: projectId,
        }
    }).then(
        function (result) {
            // Check if project is found
            if (result) {
                // Found it, now delete it
                result.destroy().then(
                    function () {
                        // Delete succesful
                        res.send(204);
                    },
                    generateErrorCallback(res)
                );
            } else {
                // Not found
                res.send(404);
            }
        },
        generateErrorCallback(res)
    );
});

module.exports = router;