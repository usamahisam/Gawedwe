import { Component, Log, App } from '../Core.js';
import FullPage from '../components/fullpage.js';
import Button from '../components/button.js';
import Modal from '../components/modal.js';

class Gambar extends Component {
	
	constructor(n) {
		super(n);
	}

	regComponents() {
		return ({
			FullPage, Button, Modal
		});
	}

	view() {
		return (`
			<FullPage id="fp">
				<h2>Gambar Bro<h2>
				<br><br><br><br>
				<h1 id="count"></h1>
				<br><br><br>
				<Button id="btn1" primary>MODAL</Button>
				<Modal id="mdl1" headerTitle="JANCOOKKK!!!!!">
				</Modal>
			</FullPage>
		`);
	}

	render(view) {
		var b = view.bundle;
		this.mdl1 = b.Modal.ID.mdl1;
		var btn1 = b.Button.ID.btn1;
		btn1.click(() => {
			this.mdl1.toggle();
		});

		this.hc = view.querySelector("#count");
		this.c = 10;
		this.hc.innerHTML = this.c;
		this.loop();
	}

	loop() {
		setTimeout(() => {
			this.c--;
			if (this.c>-1) {
				this.loop();
			}
			this.hc.innerHTML = this.c;
			if (this.c == 0) {
				// App.navigate("home");
			}
		}, 800);
	}

}

export default Gambar;
	