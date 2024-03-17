var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const {getFirestore} = require("firebase/firestore");
const {initializeApp} = require("firebase/app");
const {getAuth} = require("firebase/auth");

const config = {
    apiKey: "AIzaSyAwWVxIZwlqyLVRN9hZi1Lv6AqiyFrHTtw",
    authDomain: "lovelens-535bc.firebaseapp.com",
    databaseURL: "https://lovelens-535bc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lovelens-535bc",
    storageBucket: "lovelens-535bc.appspot.com",
    messagingSenderId: "656169376737",
    appId: "1:656169376737:web:efa1d46b9ad3e77b3c10a0",
    measurementId: "G-ZSHVYCEXL1"
  };

const fapp = initializeApp(config);
const auth = getAuth(fapp);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/api/register", require("./routes/api/register.js"));
app.use("/api/register", require("./routes/api/register.js"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
