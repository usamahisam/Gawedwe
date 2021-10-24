import { Component, Log } from '../Core.js';
import Page from '../components/page.js';

class MainActivity extends Component {
	
	constructor(n) {
		super(n);
	}

	regComponents() {
		return ({ 
			Page,
		});
	}

	view() {
		return (`
			<page headerName="Main Activity" backButton="false">
				Hello World!
			</page>
		`);
	}

	render(bundle) {
	}

}

export default MainActivity;
	