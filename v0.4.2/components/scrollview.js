import { Component } from '../Core.js';

class ScrollView extends Component {
	
	constructor() {
		super();
	}

	view() {
		return (`
			<div class="content">
			</div>
		`);
	}

	render(node) {
		this.setText('.content', node.innerHTML);
		this.stylesheet('.content', css => {
			css.color = '#ffc107';
			css.backgroundColor = '#000';
			css.width = '100%';
			css.height = '100%';
		});
	}
}

export default ScrollView;