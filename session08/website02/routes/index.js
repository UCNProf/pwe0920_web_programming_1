var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Website01', user: req.session.userid });
});

router.get('/login', function(req, res, next) {
  res.render('index/login', {title: 'Website01', user: req.session.userid});
});

router.post('/login', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	User.findOne(username, user => {
		if(user){// if a user with this username
			if(user.validPassword(password)){ // if password is valid
				// login is OK and we can set the userid in the session
				req.session.userid = user.id;
				res.redirect('/');
			}else{
				// login fails and user must try again
	  			res.render('index/login', {title: 'Website01', user: req.session.userid});
			}
		}else{
			// login fails and user must try again
	  		res.render('index/login', {title: 'Website01', user: req.session.userid});
		}
	});
});

router.get('/register', function(req, res, next) {
  res.render('index/register', {title: 'Website01', user: req.session.userid});
});

router.post('/register', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	User.insertOne(username, password, insertedId => {
		console.log(insertedId);
		res.redirect('/login');
	});
});

router.get('/logout', function(req, res, next) {
	req.session.regenerate(function(err) {
		// will have a new session here
		res.redirect('/');
	});
});

module.exports = router;
