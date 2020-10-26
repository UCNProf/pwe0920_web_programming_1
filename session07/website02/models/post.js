var ObjectId = require('mongodb').ObjectId; 

module.exports = {
	all: (callback) => {
		db.collection('posts').find().toArray((error, results) => {
			if(error) throw error;

			var posts = [];
			results.forEach(res_obj => {
				posts.push(new Post(res_obj));
			});
			return callback(posts);
		});
	},
	postById: (id, callback) => {
		var objid = new ObjectId(id);

		db.collection('posts').find({_id: objid}).toArray((error, results) => {
			if(error) throw error;

			var post = new Post(results[0]);
			return callback(post);
		});
	}
};

class Post {
	constructor(data){
		this.id = data._id;
		this.user_id = data.user_id;
		this.title = data.title;
		this.content = data.content;
	}

	toString(){
		return `Post: ${this.title} (${this.id})`;
	}
}