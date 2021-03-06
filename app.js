const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const MongoDB = require('./utils/mongodb-config');
require('dotenv').config();
const indexRouter = require('./routes/index');
const NODE_ENV = process.env.NODE_ENV;
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/talk', indexRouter);

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
  res.status(err.status || 500);
  res.render('error');
});

io.on('connection', (socket) => {
  console.log(':::> User connected');
  socket.on('join-room', (data) => {
    socket.join(data);
    socket.to(data).broadcast.emit('user-connected');
  });
});
server.listen(NODE_ENV || 3000, () => {
  MongoDB();
  console.log(`:::> Server started on ${NODE_ENV}`);
});

module.exports = app;
