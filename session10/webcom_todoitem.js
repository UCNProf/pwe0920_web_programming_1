class TodoItem extends HTMLElement {
	constructor(){
		super();
		this.attachShadow({mode: 'open'});

		var text = this.getAttribute('text') || 'Default text';
		var id = this.getAttribute('data-id') || '';

		var style = document.createElement('style');
		style.innerHTML = `
			li {
				font-family: sans-serif;
			}
			input {border: thin solid gray}
			.show {display: inline-block}
			.hide {display: none}
		`;
		this.shadowRoot.append(style);

		this.shadowRoot.innerHTML += `<li data-id="${id}">
			<form name="item">
				<a href="${id}" rel="edit" class="show">${text}</a>
				<input type="text" name="text" class="hide" value="${text}"/>
			</form>
		</li>`;
	}
	connectedCallback(){
		this.shadowRoot.querySelector('li').addEventListener('click', this.onclick_li);
		this.shadowRoot.querySelector('input').addEventListener('blur', this.onblur_input);
		this.shadowRoot.querySelector('form').addEventListener('submit', this.onsubmit_form);
	}

	onclick_li(e) {
		e.preventDefault();
		if(e.target.nodeName == 'A'){
			e.target.classList.replace('show', 'hide');
			e.target.nextElementSibling.classList.replace('hide', 'show');
			e.target.nextElementSibling.focus();
		}
	}

	onblur_input(e) {
		var input = e.target;
		var link = input.previousElementSibling;

		link.innerText = input.value;
		input.classList.replace('show', 'hide');
		link.classList.replace('hide', 'show');
	}

	onsubmit_form(e) {
		e.preventDefault();

		var input = e.target.text;
		var link = input.previousElementSibling;

		link.innerText = input.value;
		input.classList.replace('show', 'hide');
		link.classList.replace('hide', 'show');
	}
}

document.addEventListener('DOMContentLoaded', e => {
	customElements.define('todo-item', TodoItem);
});