import { Component, Log } from '../Core.js';

class Button extends Component {
	
	constructor(n) {
		super(n);
	}

	view(nodeParent) {
		var h = "";
		if (typeof(nodeParent)!=="undefined") {
			h = nodeParent.textContent;
		}
		return (`
			<h1>${h}</h1>
			<h3></h3>
		`);
	}

	render(view) {
		let s = view.style;
		s.position = 'relative';
		s.backgroundColor = '#fff';
		s.marginBottom = '5px';
		s.color = '#000';
		s.boxShadow = '0px 0px 3px 0px #ccc';
		s.padding = '10px 15px 10px 15px';
		s.border = 'none';
		s.borderRadius = '2px 2px 2px 2px';
		s.display = 'block';

		this.view = view;
		this.h1 = view.querySelector('h1');
		this.h3 = view.querySelector('h3');

		this.h1.style.margin = '0px';
		this.h3.style.margin = '0px';

	}

	isOutOfViewport() {
		var bound = this.view.getBoundingClientRect();
		var out = {};
		out.top = bound.top+200 < 0;
		out.left = bound.left < 0;
		out.bottom = bound.bottom-200 > (window.innerHeight || document.documentElement.clientHeight);
		out.right = bound.right > (window.innerWidth || document.documentElement.clientWidth);
		out.any = out.top || out.left || out.bottom || out.right;
		return out;
	}

	setVisibility(h) {
		this.view.style.visibility = h;
	}

	setTitle(t = '') {
		this.h1.textContent = t;
	}

	setSubTitle(t = '') {
		this.h3.textContent = t;
	}

	click(r) {
		this.view.addEventListener("click", (e) => {
			e.stopImmediatePropagation();
			r(e);
		});
	}
}

export default Button;