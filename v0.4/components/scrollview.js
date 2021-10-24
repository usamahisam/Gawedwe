import { Component } from '../Core.js';

class ScrollView extends Component {
	
	constructor() {
		super();
	}

	view() {
		return (`
		`);
	}

	render() {
		this.stylesheetPrimary(css => {
			css.color = '#000';
			css.backgroundColor = '#ffc107';
			css.width = '100%';
			css.height = '100%';
		});
		
	}
}

export default ScrollView;