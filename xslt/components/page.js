import { Component, App } from '../Core.js';

class Page extends Component {
	
	constructor(n) {
		super(n);
		this.html = null;
	}

	view(nodeParent) {
		this.html = nodeParent;
		return (`
			<div class="__page__"></div>
		`);
	}

	render(view) {
        this.cPage = view.querySelector(".__page__");
        this.cPage.append(this.html);
		this.cPage.style.position = 'absolute';
		this.cPage.style.top = '0';
		this.cPage.style.bottom = '0';
		this.cPage.style.left = '100px';
		this.cPage.style.right = '0';
		this.cPage.style.width = '100vw';
		this.cPage.style.height = '100vh';
		this.cPage.style.opacity = '0.0';
		this.cPage.style.backgroundColor = '#fff';
		this.cPage.style.display = 'flex';
		this.cPage.style.flexDirection = 'column';
		this.cPage.style.textRendering = 'optimizeLegibility';
        this.cPage.style.scrollBehavior = 'smooth';
        this.cPage.style.transition = 'all .2s ease-in-out';
		
        setTimeout(() => {
            this.cPage.style.opacity = '1';
			this.cPage.style.left = '0';
        }, 150);
	}

	onAfterBack() {
		this.cPage.style.left = '0px';
		this.cPage.style.opacity = '1';
	}

	onCloseBefore() {
		this.cPage.style.left = '-50px';
		this.cPage.style.opacity = '0.2';
	}

}

export default Page;