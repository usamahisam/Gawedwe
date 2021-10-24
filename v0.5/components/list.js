import { Component, Log } from '../Core.js';

class List extends Component {
	
	constructor() {
		super();
	}

	view(nodeParent) {
		return (`
			<div class="list-content">
				`+nodeParent.innerHTML+`
			</div>
		`);
	}

	render(view) {
		view.style.display = 'block';
		// view.style.marginTop = '5px';
		// view.style.marginBottom = '5px';
		view.style.padding = '10px';
		view.style.backgroundColor = '#fff';
		view.style.color = '#000';
		view.style.borderBottom = '1px solid #aaa';
		view.transition = 'all .4s ease-in-out';
		view.addEventListener('swipe', () => {
		    view.parentNode.insertBefore(view, view.parentNode.firstChild);
		});
	}
}

export default List;