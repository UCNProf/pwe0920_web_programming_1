var {SHA256} = require("sha2");

module.exports = {
	findOne: (username, callback) => {
		db.query('SELECT * FROM users WHERE name = ?', [username], (error, results, fields) => {
			if (error) throw error;
			var res = undefined;
			if(results.length > 0) {
				res = new User(results[0]);
			}
			return callback(res);
		});
	}
};

class User {
	constructor(data){
		this.id = data.id;
		this.name = data.name;
		this.password = data.password;
	}

	validPassword(password) {
		var password_buf = SHA256(password);
		var password_str = password_buf.toString('hex');
		//console.log(password_str, this.password);
		return (password_str == this.password) ? true : false;
	}
}

