var createError = require('http-errors');
var express = require('express');
var path = require('path');
const router = require("../routes/index"); 
const bcontactsRouter = require('../routes/business-contacts');
const userRouter = require('../routes/user');
let mongoose = require('mongoose');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStratgy = passportLocal.Strategy;
let DB = require('./db');

//Database setup
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});
let mongoDB = mongoose.connection;
mongoDB.once('open', () =>{
  console.log('Connected to MongoDB...');
});

let userModel = require('../models/user');
let User = userModel.User;

var app = express();

// view engine setup
app.set('views', 'views');
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('public'));


//Setup Express Session
app.use(session({
  secret: "SomeSecret",
  resave: false,
  saveUninitialized: false,
  cookie:{secure:false, maxAge:60000}
}));


passport.use(new localStratgy(
  function(username, password, done){
    User.findOne({ username: username }, function(err,user){
      if(err){return done(err);}
      if(!user){
        return done(null,false,{message: 'Incorrent Username'})
      }
      if(!user.password == password){
        return done(null,false,{message: 'Incorrent Password'})
      }
      return done(null,user);
    });
  }
  ));

//Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/',router);
app.use('/business-contacts', bcontactsRouter);
app.use('/user', userRouter);

// Serialize and Deserialize the User Info
passport.serializeUser((user,done)=>{
  if(user){
    return done(null,user.id);
  }
  return done(null,false);
});

passport.deserializeUser((id,done)=>{
  User.findById(id,(err,user)=>{
    if(err) return done(null,false);
      return done(null,user);
  })
});

module.exports = app;
