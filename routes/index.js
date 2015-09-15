var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/signin', function(req, res) {
    res.render('signin');
});

router.get('/signup', function(req, res) {
    res.render('signup');
});

router.post('/login',function(req,res){
    // when user login set the key to redis.
    req.session.username=req.body.username;

    // TODO: Add redirect to projects page
    res.end('done');
});

router.get('/logout',function(req,res){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
