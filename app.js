var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getAllRouter = require('./routes/getAllRoutes');
var adminRouter = require('./routes/adminRoutes');
var codeRouter = require('./routes/codeRoutes');
var userRouter = require('./routes/userRoutes');


var app = express();


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/root', getAllRouter);
app.use('/admins', adminRouter);
app.use('/code', codeRouter);
app.use('/user', userRouter);


module.exports = app;
