import { Component } from '../Core.js';
import Page from '../components/page.js';
import Header from '../components/header.js';

class MainActivity extends Component {
	
	constructor() {
		super();
	}

	regComponents() {
		return ({ 
			Page,
			// Header,
		});
	}

	view() {
		return (`
			<page headerName="Kabsiran" backButton="true">
				Hello World!
			</page>
		`);
	}

	render() {
	}

}

export default MainActivity;
	