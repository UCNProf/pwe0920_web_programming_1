var express = require('express');
var router = express.Router();

/* GET blog posts. */
router.get('/', function(req, res, next) {
	var q = req.query.q;
	console.log(q);
	var qstr = '';
	if (q) qstr = " WHERE title LIKE '%"+q+"%'";
	db.query('SELECT * FROM posts'+qstr+' ORDER BY date DESC', (error, results, fields) => {
		if(error) throw error;
		res.render('blog/index', { title: "Blog", posts: results});
	});
});

router.get('/new', function(req, res, next) {
	res.render('blog/form', { title: "Blog"});
});

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	console.log(id);
	db.query('SELECT * FROM posts WHERE id = ?', [id], (error, results, fields) => {
		if(error) throw error;
		res.render('blog/post', { title: "Blog", post: results[0]});
	});
});

router.post('/', function(req, res, next) {
	var title = req.body.title;
	var content = req.body.content;
	console.log(title + ' -- ' + content);
	var user_id = 1;
	if(title && content){
		db.query('INSERT INTO posts (date, user_id, title, content) VALUES (NOW(), ?, ?, ?)', [user_id, title, content], (error, results, fields) => {
			if(error) throw error;
			db.query('SELECT * FROM posts ORDER BY date DESC', (error, results, fields) => {
				if(error) throw error;
				res.render('blog/index', { title: "Blog", posts: results});
			});
		});
	}else{
		res.send('no title og content found');
	}
});

module.exports = router;
