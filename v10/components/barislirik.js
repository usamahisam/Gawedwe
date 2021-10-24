import { Component } from '../lib/core.js';

export default class BarisLirik extends Component {
	
	constructor(n) {
		super(n);
		this.html = '';
	}

	view(nodeParent) {
		this.html = nodeParent;
		return (`
        <div class="__barislirik__" style="margin-top:5px;">
            <div></div>
            <div class="__lirik__"></div>
		</div>
		`);
	}

	render(view) {
		this.lel = view.querySelector(".__lirik__");
		this.lel.append(this.html);
	}
}