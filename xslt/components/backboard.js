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
        this.bview = view;
        this.s = view.style;
        
        this.s.position = 'fixed';
        this.s.left = 0;
        this.s.right = 0;
        this.s.bottom = 0;
        this.s.top = 0;
        this.s.zIndex = '-1';
        this.s.transition = 'all .18s ease-in-out';
        this.s.background = 'rgba(110, 110, 110, .7)';
        this.s.display = 'none';
        this.s.opacity = '0.0';
    }

    open() {
        this.s.display = 'block';
        setTimeout(() => {
            this.s.opacity = '1';
        }, 150);
    }

    close() {
        setTimeout(() => {
            this.s.opacity = '0.1';
        }, 150);
    }

    destroy() {
        this.s.display = 'none';
    }

    click(r) {
        this.bview.addEventListener("click", (e) => {
            e.stopImmediatePropagation();
            r(e);
        });
    }
}

export default Backboard;