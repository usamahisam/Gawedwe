import { Component, Log } from '../Core.js';
import MenuTab from './menutab.js';

class HeaderTab extends Component {
	
	constructor(n) {
		super(n);
	}

	regComponents() {
		return ({
			MenuTab
		});
	}

	view(np) {
		var data = [];
		if (typeof(np)!=="undefined") {
			data = np.getAttribute('array').split(",");
		}
		var hm = "";
		for (var item in data) {
			hm += "<menutab>"+data[item]+"</menutab>";
		}
		return (`
			${hm}
		`);
	}

	render(view) {
		this.vs = view.style;
		this.vs.position = 'relative';
		this.vs.backgroundColor = '#fff';
		this.vs.color = '#000';
		this.vs.boxShadow = '0px 2px 2px 0px #f6f6f6';
		this.vs.zIndex = '2';
		this.vs.display = 'flex';
		this.vs.flexDirection = 'row';
	}

	setBackgroundColor(h) {
		this.vs.backgroundColor = h;
	}
}

export default HeaderTab;