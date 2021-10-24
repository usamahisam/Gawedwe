import { Component, App } from '../Core.js';

class Page extends Component {
	
	constructor(n) {
		super(n);
		this.html = '';
	}

	view(nodeParent) {
		this.html = nodeParent;
		return (`
		<div class="___page___">
		</div>
		`);
	}

	render(view) {
		this.el = view.querySelector(".___page___");
		this.el.style.position = 'absolute';
		this.el.style.top = '0';
		this.el.style.bottom = '0';
		this.el.style.left = '0';
		this.el.style.right = '0';
		this.el.style.width = '100vw';
		this.el.style.height = '100vh';
		this.el.style.backgroundColor = '#fff';
		this.el.style.display = 'flex';
		this.el.style.flexDirection = 'column';
		this.el.style.textRendering = 'optimizeLegibility';
		this.el.style.scrollBehavior = 'smooth';
		this.el.append(this.html);
	}

}

export default Page;