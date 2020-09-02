const {createServer} = require("http");

let server = createServer((request, response) => {
	//console.log(request);
	console.log(request.method);
	console.log(request.url);
	console.log(request.headers);
	//console.log(request.headers.accept);
	//console.log(request.headers['user-agent']);
	//console.log(request.headers['accept-language']);

	response.write(`<h1>Hello!</h1><p>You asked for <code>${request.url}</code></p>`);
	response.end();
});

server.listen(8080);

console.log("Listening! (port 8080)");