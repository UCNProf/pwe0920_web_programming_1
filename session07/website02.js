// switch to the db website02
use website02

// create a user that only have access to db website02
db.createUser({
		user: "website02",
		pwd: "eLow8yBSp34wXx",
		roles: ["readWrite", "dbAdmin"]
	});

// create two new user documents as variables
db.createCollection("users");
var u1 = db.users.insertOne({name:"admin", password: ""});
var u2 = db.users.insertOne({name:"chwa", password: ""});

// create three new post documents with reference to u1 and u2
db.createCollection("posts");
db.posts.insertOne({title:"Test 1", content: "<p>Content 1</p>", user_id: u1.insertedId});
db.posts.insertOne({title:"Test 2", content: "<p>Content 2</p>", user_id: u1.insertedId});
db.posts.insertOne({title:"Test 3", content: "<p>Content 3</p>", user_id: u2.insertedId});