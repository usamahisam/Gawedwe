import { Component, Log } from '../Core.js';

class Card extends Component {
	
	constructor() {
		super();
	}

	view(nodeParent) {
		this.ngeklik = nodeParent.getAttribute('ngeKlik');
		return (`
			<div class="card-content">
				`+nodeParent.innerHTML+`
			</div>
		`);
	}

	render(view) {
		view.style.display = 'block';
		view.style.marginTop = '5px';
		view.style.marginBottom = '5px';
		// view.style.width = '100px';
		view.style.padding = '10px';
		view.style.backgroundColor = '#fff';
		view.style.color = '#000';
		/*setTimeout(() => {
			view.style.backgroundColor = '#777';
			view.style.color = '#fff';
		}, 2000);*/
		view.style.boxShadow = '0px 0px 4px 0px #ccc';
		view.style.borderRadius = '4px 4px 4px 4px';
		view.style.transition = 'all 0.4s ease-in-out';
		var clickActive = false;
		if (this.ngeklik!=null) {
			let ngeklik = this.ngeklik;
			view.addEventListener('click', function(e){
				if (clickActive==true) {
					view.style.backgroundColor = '#fff';
					view.style.color = '#000';
					clickActive = false;
				} else {
					view.style.backgroundColor = '#2196f3';
					view.style.color = '#fff';
					setTimeout(() => {
						// App.runningOntribute(ngeklik);
						clickActive = true;
					}, 400);
				}
			});
		}
	}
}

export default Card;