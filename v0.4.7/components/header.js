import { Component, Log } from '../Core.js';

class Header extends Component {
	
	constructor() {
		super();
	}

	view(nodeParent) {
		this.backButton = nodeParent.getAttribute('backButton');
		var htmlBackButton = "";
		if (this.backButton=="true") {
			htmlBackButton = '<div class="header-btn"><</div>';
		}
		return (`
			`+htmlBackButton+`
			<div class="header-title">`+nodeParent.textContent+`</div>
		`);
	}

	render(view) {
		// view.style.flex = '1';
		view.style.position = 'fixed';
		view.style.zIndex = '10000';
		view.style.top = '0';
		view.style.height = '50px';
		view.style.display = 'inline-flex';
		view.style.flexDirection = 'row';
		view.style.fontSize = '20px';
		view.style.width = '100vw';
		view.style.backgroundColor = '#ffc107';
		view.style.fontWeight = 'bold';
		view.style.boxShadow = '0px 2px 2px 0px #aaa';

		var elBtn = view.querySelector(".header-btn");
		if (elBtn!=null) {
			elBtn.style.flex = '1 1 10%';
			elBtn.style.padding = '8px 13px 8px 13px';
			elBtn.style.fontSize = '30px';
			elBtn.style.textAlign = 'center';
			elBtn.style.display = 'block';
		}

		var elTitle = view.querySelector(".header-title");
		elTitle.style.flex = '2 1 90%';
		if (this.backButton=="true") {
			elTitle.style.padding = '14px 14px 14px 0px';
		} else {
			elTitle.style.padding = '14px 14px 14px 14px';
		}
	}
}

export default Header;