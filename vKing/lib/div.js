import { Component } from '../dinggo.js';

export default class Div extends Component {
	main({createWidget}) {
		return createWidget('div', ({self, style}) => {
			this.render = self;
			this.style = style;
		});
    }
}