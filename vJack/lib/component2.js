// We're importing the store Class here so we can test against it in the constructor
import render from './render.js';
import Store from './store.js';
import mount from "./mount.js";
import createElement from "./createElement.js";

export default class Component {

	constructor(props = {}) {
		let self = this;

		console.log(this.constructor.name);

		let main = this.render(props);

		console.log(main);
		// self.$app = render(main);
		// if (props.store instanceof Store) {
		// 	props.store.events.subscribe('stateChange', () => {
		// 		console.log(this.constructor.name);
		// 		self.$app = render(self.render(props));
		// 	});
		// }

	}

	render(props) {
	}

	run(idG) {
		this.isAct = true;
		mount(this.$app, idG);
	}

}