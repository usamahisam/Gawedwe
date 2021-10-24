import { Component, Log } from '../Core.js';

class ScrollView extends Component {
	
	constructor(n) {
		super(n);
	}

	view(nodeParent) {
		return (`
			<div class="content-scroll">`+nodeParent.innerHTML+`</div>
		`);
	}

	render(bundle, view) {
		this.cs = view.querySelector(".content-scroll");
		this.cs.innerHTML = 'JHVhjavfhjdvajf';
	}

	text(t = '') {
		this.cs.innerHTML = t;
	}
}

export default ScrollView;