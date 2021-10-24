import { Component, App } from '../lib/core.js';

class Header extends Component {
	
	constructor(n) {
		super(n);
	}

	view(nodeParent) {
		let c = App.__self__.name;
		if (typeof(nodeParent)!=="undefined") {
			if (nodeParent.textContent != "") {
				c = nodeParent.textContent;
			}
		}
		return (`
		<div class="__header__">
			<div class="title">${c}</div>
		</div>
		`);
	}

	render(view) {
		this.hel = view.querySelector('.__header__');
		this.hel.style.flex = '1';
		this.hel.style.padding = '15px 17px 15px 17px';
		this.hel.style.backgroundColor = '#ca0020'; // #2196f3, // #e91e63
		this.hel.style.color = '#fff';
		// this.hel.style.boxShadow = '0px 0px 5px 0px #444';

		this.title = view.querySelector('.title');
		this.title.style.fontSize = '20px';
		this.title.style.fontWeight = 'bold';
		this.title.style.letterSpacing = '0.03em';
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