var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
  {
  	title: 'Website01', 
  	test: 'Hello World',
  	items : [
  		{id:1, title:'Item 1'},
  		{id:2, title:'Item 2'}
  		]
  });
});

module.exports = router;
