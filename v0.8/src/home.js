import { Component, Log, App } from '../Core.js';
import Page from '../components/page.js';
import Header from '../components/header.js';
import ScrollView from '../components/scrollview.js';
import Button from '../components/button.js';

class Home extends Component {
	
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
				<Header>KATALOK BUKU</Header>
				<ScrollView>
					<Button id="btn1" primary>Halaman Kedua</Button>
					<h2>ABC</h2>
					<h2>ABC</h2>
					<h2>ABC</h2>
					<h2>ABC</h2>
					<h2>ABC</h2>
					<h2>ABC</h2>
					<h2>ABC</h2>
					<h2>ABC</h2>
					<h2>ABC</h2>
					<h2>ABC</h2>
					<h2>ABC</h2>
				<ScrollView>
			</Page>
		`);
	}

	render(view) {
		var b = view.bundle;
		var btn1 = b.Button.ID.btn1;
		btn1.click(() => {
			App.navigate('halaman2');
		});
	}

}

export default Home;
	