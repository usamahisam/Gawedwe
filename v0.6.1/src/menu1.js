import { Component, Log, App } from '../Core.js';
import Page from '../components/page.js';
import Header from '../components/header.js';
import Content from '../components/content.js';
import Button from '../components/button.js';
import Label from '../components/label.js';

class Menu1 extends Component {
	
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
				<Header id="header1">Over Time</Header>
				<Content mL="10" mT="10" mB="10" mR="10">
					<Label>I AM PARALYZED</Label>
					<Button id="btn2">Halaman Menu</Button>
				</Content>
			</Page>
		`);
	}

	render(view) {
		var b = view.bundle;
		this.header1 = b.Header.ID.header1;
	}

}

export default Menu1;