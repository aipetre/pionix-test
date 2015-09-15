var express = require('express');
var router = express.Router();

var Users = require('../libs/db/Users.js');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/create', function(req, res) {
  // Get params
  var params = req.body;

  Users.create(params).then(function () {
    // Successful create
    res.status(201).send('User created');
  }, function (err) {
    console.log(err);
    res.status(400).send('User not created' + err.errors[0].message);
  });

});

module.exports = router;
