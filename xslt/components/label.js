import { Component, Log } from '../Core.js';

class Label extends Component {
	
	constructor(n) {
		super(n);
	}

	view(nodeParent) {
		let c = '';
		if (typeof(nodeParent)!=="undefined") {
			c = nodeParent.textContent;
		}
		return (`
			<div class="label">${c}</div>
		`);
	}

	render(view) {
		this.vs = view.style;
		// this.vs.position = 'relative';
		// this.vs.padding = '13px 15px 13px 15px';
		// this.vs.width = '100vw';
		this.title = view.querySelector('.label');
		this.title.style.fontSize = '14px';
		this.title.style.fontWeight = '500';
		this.title.style.letterSpacing = '0.125em';
		// this.title.style.padding = '10px 0px 10px 0px';
		this.title.style.color = '#777';
		this.title.style.marginLeft = '3px';
		this.title.style.paddingBottom = '10px';
	}
}

export default Label;