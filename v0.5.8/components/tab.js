import { Component, Log } from '../Core.js';
import ScrollView from './scrollview.js';

class Tab extends Component {
	
	constructor(n) {
		super(n);
	}

	regComponents() {
		return ({
			ScrollView
		});
	}

	view(np) {
		let h = '';
		if (typeof(np)!=="undefined") {
			if (typeof(np.innerHTML)!=="undefined") {
				h = np.innerHTML;
			}
		}
		return (`
			<scrollview id="scrollview1">${h}</scrollview>
		`);
	}

	render(view) {
		view.style.position = 'relative';
		view.style.height = '100%';
		view.style.width = '100%';
		view.style.overflow = 'hidden';
		view.style.zIndex = '1';
		view.style.backgroundColor = '#fff';
		view.style.display = 'flex';
		view.style.flexDirection = 'column';
		view.style.textRendering = 'optimizeLegibility';

		this.scrollview1 = view.bundle.ScrollView.ID.scrollview1;
	}

	append(h) {
		this.scrollview1.append(h);
	}
}

export default Tab;