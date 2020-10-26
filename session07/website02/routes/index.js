var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
  {
  	title: 'Website01', 
  	test: req.session.userid,
  	items : [
  		{id:1, title:'Item 1'},
  		{id:2, title:'Item 2'}
  		]
  });
});

router.get('/login', function(req, res, next) {
  res.render('index/login', {title: 'Website01'});
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
	  			res.render('index/login', {title: 'Website01'});
			}
		}else{
			// login fails and user must try again
	  		res.render('index/login', {title: 'Website01'});
		}
	});
});

module.exports = router;
