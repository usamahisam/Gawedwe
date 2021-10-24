import { Component, Log } from '../Core.js';

class Content extends Component {
	
	constructor(n) {
		super(n);
		this.NP = null;
	}

	view(nodeParent) {
		this.NP = nodeParent;
		if (typeof(nodeParent)!=="undefined") {
			this._mT = nodeParent.getAttribute('mT');
			this._mL = nodeParent.getAttribute('mL');
			this._mR = nodeParent.getAttribute('mR');
			this._mB = nodeParent.getAttribute('mB');
		}
		return (`
		    <div class="content-container">
		    	<div class="content-main">
		    	</div>
		    </div>
		`);
	}

	render(view) {
		view.style.position = 'relative';
		view.style.height = '100%';
		view.style.overflow = 'hidden';
		view.style.overflow = 'hidden';
		view.style.zIndex = '1';
		view.style.backgroundColor = '#000';

		this.cc = view.querySelector(".content-container");
		this.cc.style.width = '100%';
		this.cc.style.height = '100%';
		this.cc.style.overflow = 'auto';
		this.cc.style.scrollBehaviour = 'smooth';

		this.cm = view.querySelector(".content-main");
		this.cm.append(this.NP);
		this.cm.style.color = '#ffffff';
		this.cm.style.marginTop = this._mT!=null?this._mT+'px':'0px';
		this.cm.style.marginLeft = this._mL!=null?this._mL+'px':'0px';
		this.cm.style.marginRight = this._mR!=null?this._mR+'px':'0px';
		this.cm.style.marginBottom = this._mB!=null?this._mB+'px':'0px';
    }
    
	append(h = '') {
		this.cm.append(h);
	}
}

export default Content;