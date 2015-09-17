var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page after login. */
router.get('/', function(req, res) {
    // Load template for angular app.
    res.sendFile(path.join(__dirname, '../public/app', 'index.html'));
});

module.exports = router;
