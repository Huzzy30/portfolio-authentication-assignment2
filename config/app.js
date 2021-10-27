var createError = require('http-errors');
var express = require('express');
var path = require('path');
const router = require("../routes/index"); 

var app = express();

// view engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", "views");
app.set('view engine', 'ejs');
app.use("/",router);
app.use(express.static('public'))
module.exports = app;
