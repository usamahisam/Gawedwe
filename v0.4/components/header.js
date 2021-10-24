import { Component } from '../Core.js';

class Header extends Component {
	
	constructor() {
		super();
	}

	view() {
		return (`
			<div class="header">
				<div class="header-btn"><</div>
				<div class="header-title">Bad Framework</div>
			</div>
		`);
	}

	render() {
		this.stylesheetPrimary(css => {
			css.color = '#000';
			css.backgroundColor = '#ffc107';
		});
		this.stylesheet('.header', css => {
			css.display = 'inline-flex';
			css.flexDirection = 'row';
			css.fontSize = '20px';
			css.color = '#000';
			css.width = '100vw';
			css.backgroundColor = '#ffc107';
			css.fontWeight = 'bold';
		});
		this.stylesheet('.header .header-btn', css => {
			css.flex = '1 1 10%';
			css.padding = '8px 8px 8px 8px';
			css.fontSize = '30px';
			css.textAlign = 'center';
		});
		this.stylesheet('.header .header-title', css => {
			css.flex = '2 1 90%';
			css.padding = '14px 14px 14px 0px';
		});
		setTimeout(() => {
			alert("A");
			this.stylesheet('.header .header-title', css => {
				css.color = 'red';
			});
		}, 3000);
	}
}

export default Header;