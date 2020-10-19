var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var indexRouter = require('./routes/index');
var blogRouter = require('./routes/blog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'website01',
	password: 'eLow8yBSp34wXx',
	database: 'website01'
});

db.connect(error => {
	if(error) throw error;
	console.log('DB connection done!');
});

global.db = db;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var sessionStore = new MySQLStore({}/* session store options */, global.db);

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
