import { Component, Log } from '../Core.js';

class Button extends Component {
	
	constructor(n) {
		super(n);
	}

	view(nodeParent) {
		var h = "";
		if (typeof(nodeParent)!=="undefined") {
			h = nodeParent.textContent;
			this.primary = nodeParent.getAttribute('primary');
		}
		return (`
			<span id="text">${h}</span>
		`);
	}

	render(view) {
		let s = view.style;
		s.position = 'relative';
		s.backgroundColor = '#fff';
		// s.marginBottom = '5px';
		s.color = '#000';
		// s.boxShadow = '0px 0px 3px 0px #ccc';
		s.padding = '5px 10px 5px 10px';
		s.border = '2px solid #000';
		// s.borderRadius = '2px 2px 2px 2px';
		s.fontSize = '14px';
		s.fontWeight = '500';
		s.display = 'block';
		// if (this.primary != null) {
		// 	s.backgroundColor = '#03a9f4';
		// 	s.color = '#000';
		// }

		this.view = view;
		this.txt = view.querySelector('#text');

	}

	isOutOfViewport() {
		var bound = this.view.getBoundingClientRect();
		var out = {};
		out.top = bound.top+100 < 0;
		out.left = bound.left < 0;
		out.bottom = bound.bottom-100 > (window.innerHeight || document.documentElement.clientHeight);
		out.right = bound.right > (window.innerWidth || document.documentElement.clientWidth);
		out.any = out.top || out.left || out.bottom || out.right;
		return out;
	}

	setVisibility(h) {
		this.view.style.visibility = h;
	}

	setTitle(t = '') {
		this.txt.textContent = t;
	}

	click(r) {
		this.view.addEventListener("click", (e) => {
			e.stopImmediatePropagation();
			r(e);
		});
	}
}

export default Button;