var postsElm, editorElm;

var sendRequest = request => {
	fetch(request).then(response => {
		return response.json();
	}).then(result => {
		let event = new CustomEvent(request.eventName, {detail: result});
		document.dispatchEvent(event);
	});
};

var onpostsclicked = e => {
	e.preventDefault();
	if(e.target.nodeName == 'A'){
		var id = e.target.attributes['href'].value;
		var rel = e.target.rel;
		var request;
		switch(rel){
			case 'read':
				request = new Request('/api/posts/'+id, {method: 'GET'});
				request.eventName = 'getpost';
				break;
			case 'delete':
				request = new Request('/api/posts/'+id, {method: 'DELETE'});
				request.eventName = 'deletepost';
				break;
		}
		sendRequest(request);
	}
};

var oneditorsubmit = e => {
	e.preventDefault();
	var post = {title: e.target.title.value, content: e.target.content.value};
	var request;
	if(e.target.id.value){
		//PUT
		request = new Request(
			`/api/posts/${e.target.id.value}`, {
				method: 'PUT',
				headers: {'Content-type': 'application/json'},
				body: JSON.stringify(post)});
		request.eventName = 'putpost';
	}else{
		//POST
		request = new Request(
			`/api/posts`, {
				method: 'POST',
				headers: {'Content-type': 'application/json'},
				body: JSON.stringify(post)});
		request.eventName = 'postpost';
	}
	e.target.reset();
	e.target.id.value = '';
	sendRequest(request);

};

var updateList = e => {
	var posts = e.detail;
	posts.forEach(post => {
		postsElm.innerHTML += `<li><a href="${post.id}" rel="read">${post.title}</a> - <a href="${post.id}" rel="delete">x</a></li>`;
	});
};

var updateListPut = e => {
	var post = e.detail;
	postsElm.querySelector(`a[href = "${post.id}"][rel = "read"]`).innerText = post.title;
};

var updateListPost = e => {
	var post = e.detail;
	postsElm.innerHTML += `<li><a href="${post.id}" rel="read">${post.title}</a> - <a href="${post.id}" rel="delete">x</a></li>`;
};

var updateListDelete = e => {
	var id = e.detail.id;
	postsElm.querySelector(`a[href = "${id}"][rel = "read"]`).parentElement.outerHTML = '';
};

var updateEditor = e => {
	var post = e.detail;
	editorElm.id.value = post.id;
	editorElm.title.value = post.title;
	editorElm.content.value = post.content;
};

document.addEventListener('DOMContentLoaded', e => {
	postsElm = document.querySelector('ul#posts');
	editorElm = document.forms.editor;

	postsElm.addEventListener('click', onpostsclicked);
	editorElm.addEventListener('submit', oneditorsubmit);

	document.addEventListener('getposts', updateList);
	document.addEventListener('getpost', updateEditor);
	document.addEventListener('putpost', updateListPut);
	document.addEventListener('postpost', updateListPost);
	document.addEventListener('deletepost', updateListDelete);


	var request = new Request('/api/posts', {method: 'GET'});
	request.eventName = 'getposts';
	sendRequest(request);
});