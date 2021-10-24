import { Component, Log } from '../Core.js';
import Page from '../components/page.js';
import Card from '../components/card.js';
import Header from '../components/header.js';
import List from '../components/list.js';

class MainActivity extends Component {
	
	constructor() {
		super();
	}

	regComponents() {
		return ({ 
			Page,
			Card,
			Header,
			List,
		});
	}

	view() {
		return (`
			<page headerName="Main Activity" backButton="false">
				Hello World!
				<card class="kartu" ngeKlik="this.keMenu()">Kartu 1</card>
				<list>Vvibu Lo</list>
				<list>Tavvuran Bozz</list>
			</page>
		`);
	}

	render(view) {
		var elScrollContent = view.querySelector("scrollview .container .content");
		elScrollContent.style.padding = '10px 10px 10px 10px';
		// setTimeout(() => {
		// 	this.append(elScrollContent, '<card class="kartu" ngeKlik="this.keMenu()">APlikasi</card>');
		// }, 5000);
		// var elCard = view.querySelectorAll(".kartu");
		// Log.w(elCard);
	}

	keMenu() {
		alert("A");
	}

}

export default MainActivity;
	