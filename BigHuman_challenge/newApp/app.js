var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('express-jwt'); // New import!  

// Import routing files
var indexRouter = require('./routes/index');

// Activate .env file 
require('dotenv').config();

var app = express();

// Connect to MongoDB 
var mongoose = require('mongoose');
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})

// View-engine setup (using Jade for now)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'frontend/build')));

// Check whether or not user has a valid session token, but allow certain pages. 
app.use(jwt({secret: 'jonimitchell'}).unless({path: ['/auth', '/auth/check', '/employees/register']}));
app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // Render error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;