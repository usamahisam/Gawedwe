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
		<div class="__header__">
			<div class="title">${c}</div>
		</div>
		`);
	}

	render(view) {
		this.hel = view.querySelector('.__header__');
		this.hel.style.position = 'relative';
		this.hel.style.padding = '13px 15px 13px 15px';
		this.hel.style.backgroundColor = '#fff';
		this.hel.style.color = '#000';
		this.hel.style.boxShadow = '0px 2px 2px 0px #ccc';
		this.hel.style.zIndex = '2';
		this.hel.style.transition = 'all 0.6s ease-in-out';

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