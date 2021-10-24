import { Component, App } from '../Core.js';

class BlankPage extends Component {
	
	constructor(n) {
		super(n);
	}

	view(nodeParent) {
		return (`
			${nodeParent.innerHTML}
		`);
	}

	render(view) {
		view.style.position = 'absolute';
		view.style.top = '0';
		view.style.bottom = '0';
		view.style.left = '0';
		view.style.right = '0';
		view.style.width = '100vw';
		view.style.height = '100vh';
		// view.style.backgroundColor = '#fff';
		view.style.zIndex = '2';
		// view.style.display = 'flex';
		// view.style.flexDirection = 'column';
		view.style.textRendering = 'optimizeLegibility';
		view.style.textAlign = 'center';
	}

}

export default BlankPage;