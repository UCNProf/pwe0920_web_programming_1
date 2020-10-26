var {SHA256} = require("sha2");

module.exports = {
	findOne: async (username, callback) => {
		var user = await db.collection('users').findOne({name: username});
		console.log(user);
		var userobj = new User(user);

		return callback(userobj);
	}
};

class User {
	constructor(data){
		this.id = data._id;
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

