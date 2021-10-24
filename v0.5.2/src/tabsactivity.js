import { Component, App } from '../Core.js';
import Tabs from '../components/tabs.js';
import Button from '../components/button.js';

class TabsActivity extends Component {
	
	constructor(n) {
		super(n);
	}

	regComponents() {
		return ({
			Tabs, Button
		});
	}

	view() {
		return (`
			<tabs id="tabs1" title="TabsActivity">
				<tab id="tab1" name="Chat">
					Chats
					<Button id="btn1" primary>Ke Home</Button>
				</tab>
				<tab id="tab2" name="Status">
					Status
				</tab>
				<tab id="tab3" name="Panggilan">
					Status
				</tab>
			</tabs>
		`);
	}

	render(view) {
		var b = view.bundle;
		var btn1 = b.Button.ID.btn1._view;
		btn1.addEventListener("click", () => {
			App.navigate("home");
		});
	}

}

export default TabsActivity;
	