import { Component, Log } from '../Core.js';

class Header extends Component {
	
	constructor(n) {
		super(n);
	}

	view(nodeParent) {
		let c = '';
		if (typeof(nodeParent)!=="undefined") {
			c = nodeParent.textContent;
		}
		return (`
			<div class="title">${c}</div>
		`);
	}

	render(view) {
		this.vs = view.style;
		this.vs.position = 'relative';
		this.vs.padding = '13px 15px 13px 15px';
		this.vs.backgroundColor = '#fff';
		this.vs.color = '#000';
		this.vs.boxShadow = '0px 2px 2px 0px #ccc';
		this.vs.zIndex = '2';
		this.vs.transition = 'all 0.6s ease-in-out';

		this.title = view.querySelector('.title');
		this.title.style.fontSize = '20px';
		this.title.style.fontWeight = 'bold';
	}

	setTitle(text = '') {
		this.title.textContent = text;
	}

	setBackgroundColor(h) {
		this.vs.backgroundColor = h;
	}

	setTitleColor(h) {
		this.title.style.color = h;
	}
}

export default Header;