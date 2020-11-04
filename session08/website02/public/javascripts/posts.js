var postsElm, editorElm;

var onpostsclicked = e => {
	e.preventDefault();
	if(e.target.nodeName == 'A'){
		var id = e.target.attributes['href'].value;
		fetch('/api/posts/'+id).then(response => {
			return response.json();
		}).then(post => {
			updateEditor(post);
		});
	}
};

var updateList = posts => {
	posts.forEach(post => {
		postsElm.innerHTML += `<li><a href="${post.id}">${post.title}</a></li>`;
	});
};

var updateEditor = post => {
	editorElm.id.value = post.id;
	editorElm.title.value = post.title;
	editorElm.content.value = post.content;
};

document.addEventListener('DOMContentLoaded', e => {
	postsElm = document.querySelector('ul#posts');
	editorElm = document.forms.editor;

	postsElm.addEventListener('click', onpostsclicked);

	fetch('/api/posts').then(response => {
		return response.json();
	}).then(posts => {
		updateList(posts);
	});

});