var express = require('express');
var router = express.Router();
// Get db models.
var models  = require('../models');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/create', function(req, res) {
  // Get params
  var params = req.body;

  // Add new user.
  models.Users.create(params).then(function () {
    // Successful create
    res.render('success');
  }, function (err) {
    console.log(err);
    res.render('signup', {
      errors: [err.errors[0].message]
    });
  });
});

module.exports = router;
