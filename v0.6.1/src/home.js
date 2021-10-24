import { Component, Log, App } from '../Core.js';
import Page from '../components/page.js';
import Header from '../components/header.js';
import Content from '../components/content.js';
import Button from '../components/button.js';
import Label from '../components/label.js';

class Home extends Component {
	
	constructor(n) {
		super(n);
	}

	regComponents() {
		return ({
			Page, Header, Content, Button, Label
		});
	}

	view() {
		return (`
			<Page id="page">
				<Header id="header1">Distance</Header>
				<Content mL="10" mT="10" mB="10" mR="10">
					<Label>@ENIGMA</Label>
					<Button id="btn1">Buka Modal</Button>
					<br>
					<Button id="btn2">Halaman berikutnya...</Button>
				</Content>
			</Page>
		`);
	}

	render(view) {
		var b = view.bundle;
		this.header1 = b.Header.ID.header1;

		this.btn1 = b.Button.ID.btn1;
		this.btn1.click(() => {
			App.openMenu("modal");
		});
		this.btn2 = b.Button.ID.btn2;
		this.btn2.click(() => {
			App.navigate("menu");
		});
	}

}

export default Home;
	