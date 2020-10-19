module.exports = {
	all: (callback) => {
		db.query('SELECT * FROM posts ORDER BY date DESC', (error, results, fields) => {
			if(error) throw error;
			var posts = [];
			results.forEach(res_obj => {
				posts.push(new Post(res_obj));
			});
			return callback(posts);
		});
	},
	postById: (id, callback) => {
		db.query('SELECT * FROM posts WHERE id = ?', [id], (error, results, fields) => {
			if(error) throw error;
			var post = new Post(results[0]);
			return callback(post);
		});
	}
};

class Post {
	constructor(data){
		this.id = data.id;
		this.date = data.date;
		this.user_id = data.user_id;
		this.title = data.title;
		this.content = data.content;
	}

	toString(){
		return `Post: ${this.title} (${this.id})`;
	}
}