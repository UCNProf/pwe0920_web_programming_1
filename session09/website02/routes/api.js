var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');
var ObjectId = require('mongodb').ObjectId; 

/* GET users listing. */
router.get('/posts', function(req, res, next) {
	var qobj = {user_id: ObjectId(req.session.userid) };
	Post.find(qobj, posts => {
		res.json(posts);
	});
});

router.get('/posts/:id', function(req, res, next) {
	var qobj = {
		_id: ObjectId(req.params.id),
		user_id: ObjectId(req.session.userid)
	};
	Post.findOne(qobj, post => {
		if(post){
			res.json(post);
		}else{
			res.status(401);
    		res.json({error:"Unauthorized"});
		}
	});
});

router.post('/posts', function(req, res, next) {
	var post = {
		title: req.body.title,
		content: req.body.content,
		user_id: ObjectId(req.session.userid)
	};
	Post.insertOne(post, insertedId => {
		//res.json({id: insertedId});
		var qobj = {
			_id: ObjectId(insertedId),
			user_id: ObjectId(req.session.userid)
		};
		Post.findOne(qobj, post => {
			if(post){
				res.json(post);
			}else{
				res.status(401);
	    		res.json({error:"Unauthorized"});
			}
		});
	});
});

router.put('/posts/:id', function(req, res, next) {
	var post = {
		_id: ObjectId(req.params.id),
		title: req.body.title,
		content: req.body.content,
		user_id: ObjectId(req.session.userid)
	};
	Post.updateOne(post, nModified => {
		//res.json({nModified: nModified});
		var qobj = {
			_id: ObjectId(req.params.id),
			user_id: ObjectId(req.session.userid)
		};
		Post.findOne(qobj, post => {
			if(post){
				res.json(post);
			}else{
				res.status(401);
	    		res.json({error:"Unauthorized"});
			}
		});

	});
});

router.delete('/posts/:id', function(req, res, next) {
	var qobj = {
		_id: ObjectId(req.params.id),
		user_id: ObjectId(req.session.userid)
	};
	Post.deleteOne(qobj, n => {
		res.json({id: req.params.id});
	});
});

module.exports = router;
