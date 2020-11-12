var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');
var ObjectId = require('mongodb').ObjectId; 

/* GET blog posts. */
router.get('/', function(req, res, next) {
	var q = req.query.q;
	var qobj = {};
	var exp = new RegExp(q, 'i');

	// if q is in the querystring and has a value, then add
	// the regex to title if q=test => qobj = {title: /test/i}
	if (q) qobj.title = exp;

	Post.find(qobj, posts => {
		res.render('blog/index', { title: "Blog", posts: posts, user: req.session.userid});
	});
});

router.get('/new', function(req, res, next) {
	res.render('blog/form', { title: "Blog", user: req.session.userid});
});

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	console.log(id);
	Post.postById(id, post => {
		console.log(post.toString(), typeof post);
		res.render('blog/post', { title: "Blog", post: post, user: req.session.userid});
	});
});

router.post('/', function(req, res, next) {
	var qobj = {};

	if(req.session.userid) {
		var post = {
			title: req.body.title,
			content: req.body.content,
			user_id: ObjectId(req.session.userid)
		};
		Post.insertOne(post, insertedId => {
			Post.find(qobj, posts => {
				res.render('blog/index', { title: "Blog", posts: posts, user: req.session.userid});
			});
		});
	}else{
		Post.find(qobj, posts => {
			res.render('blog/index', { title: "Blog", posts: posts, user: req.session.userid});
		});
	}
});

module.exports = router;
