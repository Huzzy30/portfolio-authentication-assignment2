/*******************************************************************************************************
*                                                                                                      *
*           File name     :  user.js                                                               *
*           Student name :  Huzaifah Mahifa                                                           *
*           StudentID     :  300747824                                                                 *
*           Date  :  10/26/2021                                                                         *
*                                                                                                      *
********************************************************************************************************/
//import required libraries

var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// Get Login Route
router.get("/login", function(req, res, next) {
        res.render('auth/login', { title: 'Login',user: ""  }); 
});

// Post Login Route
router.post('/login', passport.authenticate('local'),function(req, res){
    res.redirect('/business-contacts'); 
});

// Post Logout Route
router.get('/logout', function(req, res){
    req.logOut();
    res.redirect('/user/login'); 
});

module.exports = router;