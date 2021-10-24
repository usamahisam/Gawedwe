import { Component, Log } from '../Core.js';

class MenuTab extends Component {
	
	constructor(n) {
		super(n);
	}

	view(nodeParent) {
		return (`
			<span id="text">${nodeParent.textContent}</span>
		`);
	}

	render(view) {
		view.style.alignItems = 'stretch';
		view.style.width = '100%';
		view.style.textAlign = 'center';
		view.style.padding = '13px 15px 13px 15px';
		view.style.fontWeight = 'bold';
		view.style.fontSize = '14px';
	}
}

export default MenuTab;