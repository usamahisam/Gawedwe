import { Component } from '../Core.js';
import Header from './header.js';
import ScrollView from './scrollview.js';

class Page extends Component {
	
	constructor() {
		super();
	}

	regComponent() {
		return ({ 
			Header,
			ScrollView,
		});
	}

	view() {
		return (`
			<header>Aplikasi ini memiliki</header>
			<scrollview>Konten ini memiliki dukungan</scrollview>
		`);
	}

	render() {

	}
}

export default Page;