let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//mongdb 
let mongoose = require('mongoose');
let DB = require('./db');

//mongoose to the db uri
mongoose.connect(DB.URI);
let mongDB = mongoose.connection;
mongDB.on('error',console.error.bind(console,'Connection error:'));
mongDB.once('open',() => {
  console.log('Connected to MongoDB');
});

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let plantsRouter = require('../routes/plant')



let app = express();

//engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/plants',plantsRouter)

//forward error handling
app.use(function(req, res, next) {
  next(createError(404));
});

//error handling
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //error page
  res.status(err.status || 500);
  res.render('error',
  {
    title:"Error"
  }
  );
});

module.exports = app;
