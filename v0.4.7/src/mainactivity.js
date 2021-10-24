import { Component, Log } from '../Core.js';
import Page from '../components/page.js';
import Card from '../components/card.js';

class MainActivity extends Component {
	
	constructor() {
		super();
	}

	regComponents() {
		return ({ 
			Page,
			Card,
		});
	}

	view() {
		return (`
			<page headerName="MainActivity" backButton="true">
				Hello World!
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 1</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 2</card>
			</page>
		`);
	}

	render(view) {
		var elScrollContent = view.querySelector("scrollview .scroll .content");
		var elCard = view.querySelectorAll(".kartu");
	}

	keMenu() {
		alert("A");
	}

}

export default MainActivity;
	