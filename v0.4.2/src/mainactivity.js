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
			Header,
		});
	}

	view() {
		return (`
			<page headerName="Hello World" backButton="true">
				Hello World!
				<div id="co">
					<header backButton="true">Salam Perdamaian</header>
				</div>
			</page>
		`);
	}

	render() {
	}

}

export default MainActivity;
	