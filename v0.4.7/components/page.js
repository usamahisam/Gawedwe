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

	view(nodeParent) {
		return (`
			<header backButton="`+nodeParent.getAttribute('backButton')+`">`+nodeParent.getAttribute('headerName')+`</header>
			<scrollview>`+nodeParent.innerHTML+`</scrollview>
		`);
	}

	render(view) {
		// var elContent = view.querySelector(".page-content");
		view.style.width = '100vw';
		view.style.height = '100vh';
		view.style.overflow = 'hidden';
		view.style.position = 'absolute';
	}
}

export default Page;