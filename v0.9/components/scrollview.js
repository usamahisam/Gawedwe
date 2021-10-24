import { Component, Log } from '../Core.js';

class ScrollView extends Component {
	
	constructor(n) {
		super(n);
		this.html = null;
	}

	view(nodeParent) {
		this.html = nodeParent;
		return (`
		<div class="__scrollview__">
		    <div class="content-container">
		    	<div class="content-main">
		    	</div>
			</div>
		</div>
		`);
	}

	render(view) {
		this.svel = view.querySelector(".__scrollview__");
		this.svel.style.position = 'relative';
		this.svel.style.overflow = 'hidden';
		this.svel.style.backgroundColor = '#fff';
		
		this.cc = view.querySelector(".content-container");
		this.cc.style.width = '100%';
		this.cc.style.height = '100%';
		this.cc.style.overflow = 'auto';
		this.cc.style.scrollBehaviour = 'smooth';

		this.cm = view.querySelector(".content-main");
		this.cm.append(this.html);
		this.cm.style.margin = '10px';
	}
}

export default ScrollView;