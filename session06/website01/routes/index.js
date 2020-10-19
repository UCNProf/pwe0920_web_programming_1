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
		console.log(user);
		//if(user.validPassword(password)){
			req.session.userid = user.id;
		//}
	});
  res.render('index/login', {title: 'Website01'});
});

module.exports = router;
