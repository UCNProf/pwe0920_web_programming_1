var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var indexRouter = require('./routes/index');
var blogRouter = require('./routes/blog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var mongoclient = MongoClient.connect('mongodb://website02:eLow8yBSp34wXx@127.0.0.1:27017/website02?w=majority', { useUnifiedTopology: true });

mongoclient.then(client => {
  global.db = client.db('website02');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var sessionStore = new MongoStore({
  clientPromise: mongoclient,
  dbName: 'website02'
});

app.use(session({
  secret: '4y3nuqfvRQM5witwuBv9',
  cookie: { maxAge: 7*24*60*60*1000 },
  resave: true,
  saveUninitialized: true,
  store: sessionStore
}));

app.use('/', indexRouter);
app.use('/blog', blogRouter);

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
