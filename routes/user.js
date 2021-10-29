var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

router.get("/login", function(req, res, next) {
        res.render('auth/login', { title: 'Login',user: ""  }); 
});

router.post('/login', passport.authenticate('local'),function(req, res){
    res.redirect('/business-contacts'); 
});

router.get('/logout', function(req, res){
    req.logOut();
    res.redirect('/user/login'); 
});

module.exports = router;