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

module.exports = router;
