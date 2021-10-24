import { Component, Log, App } from '../Core.js';
import Page from '../components/page.js';
import Header from '../components/header.js';
import ScrollView from '../components/scrollview.js';
import Button from '../components/button.js';

class Halaman2 extends Component {
	
	constructor(n) {
		super(n);
	}

	regComponents() {
		return ({
			Page, Header, ScrollView, Button
		});
	}

	view() {
		return (`
			<Page>
				<Header>Halaman 2</Header>
                <ScrollView>
                    <h2>Halaman Kedua</h2>
					<h5>J</h5>
					<h5>A</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<Button id="btn1">Kembali</Button>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
					<h5>J</h5>
				<ScrollView>
			</Page>
		`);
	}

	render(view) {
		var b = view.bundle;
		var btn1 = b.Button.ID.btn1;
		btn1.click(() => {
			App.close();
		});
	}

}

export default Halaman2;
	