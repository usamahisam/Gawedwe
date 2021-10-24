import { Component, Log } from '../Core.js';
import Header from './header.js';
import HeaderTab from './headertab.js';
import Tab from './tab.js';

class Tabs extends Component {
	
	constructor(n) {
		super(n);
	}

	regComponents() {
		return ({ 
			Header,
			HeaderTab,
			Tab,
		});
	}

	view(nodeParent) {
		this.getTab = nodeParent.querySelectorAll("tab");
		var htab = "";
		var arr_tabname = [];
		for (var i = 0; i < this.getTab.length; i++) {
			htab += this.getTab[i].outerHTML;
			arr_tabname.push(this.getTab[i].getAttribute('name').toUpperCase());
		}
		return (`
			<header id="header1">${nodeParent.getAttribute('title')}</header>
			<headertab id="headertab1" array="${arr_tabname}"></headertab>
			<box>${htab}</box>
		`);
	}

	render(view) {
		this.v = view;
		let xs = view.style;
		xs.position = 'absolute';
		xs.top = '0';
		xs.bottom = '0';
		xs.left = '0';
		xs.right = '0';
		xs.width = '100vw';
		xs.height = '100vh';
		xs.backgroundColor = '#fff';
		xs.display = 'flex';
		xs.flexDirection = 'column';
		xs.textRendering = 'optimizeLegibility';

		let box = view.querySelector("box");
		box.style.position = 'relative';
		box.style.height = '100%';
		box.style.overflow = 'hidden';
		box.style.zIndex = '1';
		box.style.backgroundColor = '#fff';
		box.style.display = 'flex';
		box.style.flexDirection = 'row';
		box.style.textRendering = 'optimizeLegibility';

		let xb = view.bundle;
		xb.Header.ID.header1.vs.boxShadow = 'none';
	}

}

export default Tabs;