import { Component, Log, App } from '../Core.js';
import Page from '../components/page.js';
import Header from '../components/header.js';
import ScrollView from '../components/scrollview.js';
import Button from '../components/button.js';
import Modal from '../components/modal.js';

class Home extends Component {
	
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
				<Header id="header1">SEGAWON MANIA COMMUNITY</Header>
				<ScrollView id="scrollview1">
					<Button id="btn1" primary>Segawon Mania!!!...</Button>
					<Button id="btn2" primary>Klik disini untuk melanjutkan bos!!!...</Button>
					<Modal id="mdl1" headerTitle="SELAMAT!!..">
						Anda pancen SEGAWON!!!!!!!!
						<Button id="btn3" primary>Gambar</Button>
						<Button id="btn4" primary>B</Button>
					</Modal>
				</ScrollView>
			</Page>
		`);
	}

	render(view) {
		var b = view.bundle;
		this.mdl1 = b.Modal.ID.mdl1;
		var btn1 = b.Button.ID.btn1;
		var btn2 = b.Button.ID.btn2;
		var btn3 = b.Button.ID.btn3;
		var btn4 = b.Button.ID.btn4;

		btn1.click(() => {
			App.openMenu("modal");
		});
		btn2.click(() => {
			this.mdl1.toggle();
		});
		btn3.click(() => {
			App.navigate("gambar");
		});
		btn4.click(() => {
			alert("B");
		});
	}

	onReady() {
		if (this.mdl1.isOpen) {
			this.mdl1.toggle();
		}
	}

}

export default Home;
	