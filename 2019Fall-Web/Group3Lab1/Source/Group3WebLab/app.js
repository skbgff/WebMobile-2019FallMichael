var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var createError = require('http-errors');
var cors = require('cors');

// Bring in the data model
require('./api/models/db');
require('./api/config/passport');

var apiRouter = require('./api/routes/index');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'dist/StudentPortal')));
app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.sendStatus(err.status || 500);
  res.sendStatus(err.status);
});

module.exports = app;

