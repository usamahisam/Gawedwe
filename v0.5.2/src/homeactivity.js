import { Component, Log, App } from '../Core.js';
import Page from '../components/page.js';
import Header from '../components/header.js';
import ScrollView from '../components/scrollview.js';
import Button from '../components/button.js';
import Modal from '../components/modal.js';

class HomeActivity extends Component {
	
	constructor(n) {
		super(n);
	}

	regComponents() {
		return ({
			Page, Header, ScrollView, Button, Modal
		});
	}

	view() {
		return (`
			<Page id="page">
				<Header id="header1">Vvibu</Header>
				<ScrollView id="scrollview1">
					Ini Home Activity <br>
					<Button id="btn1" primary>Ke Tabs</Button>
					<Button id="btn2" primary>Buka Modal Won....</Button>
					<Modal id="mdl1">123</Modal>
				</ScrollView>
			</Page>
		`);
	}

	render(view) {
		var b = view.bundle;
		var btn1 = b.Button.ID.btn1._view;
		var btn2 = b.Button.ID.btn2._view;
		var mdl1 = b.Modal.ID.mdl1;

		btn1.addEventListener("click", () => {
			App.navigate("tabs");
		});
		btn2.addEventListener("click", () => {
			mdl1.toggle();
		});
	}

	onReady() {
	}

}

export default HomeActivity;
	