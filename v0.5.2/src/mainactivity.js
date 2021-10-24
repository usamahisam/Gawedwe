import { Component, Log, App } from '../Core.js';
import Page from '../components/page.js';
import Header from '../components/header.js';
import ScrollView from '../components/scrollview.js';
import Button from '../components/button.js';
import Card from '../components/card.js';

class MainActivity extends Component {
	
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
			<Page id="page1">
				<Header id="header1">MainActivity</Header>
				<ScrollView id="scrollview1">
					<Button class="am2" id="btn2">Ke Home</Button>
					<Button class="am2" id="btn1" primary>Ke Tabs</Button>
					<Button class="am2">I</Button>
				</ScrollView>
			</Page>
		`);
	}

	render(view) {
		var b = view.bundle;
		var scrollview1 = b.ScrollView.ID.scrollview1;
		this.i = 0;
		this.proses(scrollview1);
		var header1 = b.Header.ID.header1._view;
		header1.addEventListener("click", () => {
			App.navigate("home");
		});
	}

	proses(sv) {
		this.getData(sv);
		this.i++;
		if (this.i <= 10) {
			setTimeout(() => {
				this.proses(sv);
			}, 50);
		}
	}

	getData(sv) {
		let card = new Card();
		card.setTitle("Ini Title");
		card.setSubTitle("Ini Sub Title");
		sv.append(card._view);
		sv.onScroll((e) => {
			if (!card.isOutOfViewport().any) {
				card.setVisibility("visible");
			} else {
				card.setVisibility("hidden");
			}
		});
	}

}

export default MainActivity;
	