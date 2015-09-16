var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.render('projects/index');
});

router.get('/retrieve/:projectId',function(req,res){
    // TODO Get project
});

router.post('/create',function(req,res){
    // TODO Create project
});

router.post('/update/:projectId',function(req,res){
    // TODO Update project
});

router.delete('/delete/:projectId',function(req,res){
    // TODO Delete project
});

module.exports = router;