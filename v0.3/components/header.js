import { Component } from '../incode/Core.js';

class Header extends Component {
	
	constructor() {
		super();
	}

	view() {
		return `
			<div class="header">
				<div class="btn"><</div>
				<div class="title">Bad Framework</div>
			</div>
		`;
	}

	render() {
		this.stylesheet('.header', css => {
			css.padding = '10px';
			css.backgroundColor = '#3F51B5';
		});
		this.stylesheet('.header .title', css => {
			css.fontSize = '20px';
			css.color = '#fff';
		});
	}
}

export default Header;