import { Component } from '../lib/core.js';

class ScrollView extends Component {
	
	constructor(n) {
		super(n);
		this.html = null;
	}

	view(nodeParent) {
		this.html = nodeParent;
		return (`
		<div class="__scrollview__">
			<div class="__content-main__">
			</div>
		</div>
		`);
	}

	render(view) {
		this.svel = view.querySelector(".__scrollview__");
		this.svel.style.position = 'relative';
		this.svel.style.flex = '2';
		this.svel.style.overflow = 'hidden';
		this.svel.style.backgroundColor = '#222';
		this.svel.style.color = '#fff';
		this.svel.style.flexDirection = 'column';
		this.svel.style.textRendering = 'optimizeLegibility';
		this.svel.style.scrollBehavior = 'smooth';
		this.svel.style.boxShadow = 'none';
		this.svel.style.transition = 'all .2s ease-in-out';

		this.cm = view.querySelector(".__content-main__");
		this.cm.append(this.html);
		this.cm.style.margin = '10px';
	}
}

export default ScrollView;