import { Component, Log } from '../Core.js';

class Backboard extends Component {
	
	constructor(n) {
        super(n);
	}

	view(nodeParent) {
        return (`
            <div class="backboard-view">
            </div>
		`);
	}

	render(view) {
        this.s = view.style;
        
        // this.s = view.querySelector(".backboard-view").style;
        this.s.position = 'fixed';
        this.s.left = 0;
        this.s.right = 0;
        this.s.bottom = 0;
        this.s.top = 0;
        // this.s.width = '100vw';
        // this.s.height = '100vh';
        this.s.zIndex = '-1';
        this.s.display = 'none';
        this.s.transition = 'all .30s ease-in-out';
    }

    open() {
        // this.s.transition = 'all .30s ease-in-out';
        this.s.background = 'rgba(50, 50, 50, .7)';
        this.s.display = 'block';
        // setTimeout(() => {
        //     this.s.transition = 'none';
        //     this.s.display = 'block';
        // }, 1000);
    }

    close() {
        // this.s.transition = 'all .30s ease-in-out';
        this.s.background = 'none';
        this.s.display = 'none';
        // setTimeout(() => {
        //     this.s.transition = 'none';
        //     this.s.display = 'none';
        // }, 1000);
    }
}

export default Backboard;