import { Component, Log } from '../Core.js';

class MainActivity extends Component {
	
	constructor() {
		super();
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
	}

}

export default MainActivity;
	