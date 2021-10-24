import { Component, Log } from '../Core.js';
import ScrollView from './scrollview.js';

class Page extends Component {
	
	constructor(n) {
		super(n);
	}

	regComponents() {
		return ({ 
			ScrollView,
		});
	}

	view(nodeParent) {
		return (`
			<scrollview>`+nodeParent.innerHTML+`</scrollview>
		`);
	}

	render(bundle) {
		this.sc = bundle.ScrollView;
	}

	addContent(t = '') {
		this.sc.text(t);
	}
}

export default Page;