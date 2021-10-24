import { Component, Log } from '../Core.js';
import Header from './header.js';
import ScrollView from './scrollview.js';

class Page extends Component {
	
	constructor() {
		super();
	}

	regComponents() {
		return ({ 
			Header,
			ScrollView,
		});
	}

	view() {
		return (`
			<header>Bad Header</header>
			<scrollview>Aplikasi</scrollview>
		`);
	}

	render(node) {
		this.setAttr('header', 'backButton', node.getAttribute('backButton'));
		this.setHtml('header', node.getAttribute('headerName'));
		this.setHtml('scrollview', node.innerHTML);
	}
}

export default Page;