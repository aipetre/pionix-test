var express = require('express');
var router = express.Router();
// Get db models.
var models  = require('../models');
var Users = models.Users;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('signin');
});

// GET login page
router.get('/signin', function(req, res) {
    var errors = [];
    if (req.session.invalid) {
        errors.push('Your session has expired.');
        req.session.invalid = null;
    }
    res.render('signin');
});

// POST login submit action
router.post('/signin',function(req,res){
    Users.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    }).then(
        function (result) {
            // Check if user found
            if (result) {
                // User found
                // Set the key to redis.
                req.session.username = req.body.username;
                req.session.userId = result.dataValues.id;

                // Redirect to projects page.
                res.redirect('/dashboard');
            } else {
                // Username or password is wrong
                res.render('signin', {
                    errors: ["Username or password are invalid."]
                });
            }
        },
        function (err) {
            // Something went wrong
            // Note: showing error on page directly
            // TODO: Just log error and display general error message
            res.render('signin', {
                errors: [err]
            });
        }
    );
});

// GET create user page
router.get('/signup', function(req, res) {
    res.render('signup');
});

// GET logout action
router.get('/logout',function(req,res){
    // Remove from redis
    req.session.destroy(function(err){
        // TODO: log error.
        if(err){
            console.log(err);
        }

        res.redirect('/');
    });
});

module.exports = router;
