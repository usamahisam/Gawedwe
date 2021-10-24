import { Component, App } from '../Core.js';
import AppTopBar from './apptopbar.js';

class AppBoard extends Component {
	
	constructor(n) {
		super(n);
		this.html = null;
	}

	regComponents() {
		return ({
			AppTopBar
		});
	}

	view(nodeParent) {
		this.html = nodeParent;
		let th = 'light';
		this._tlight();
		this.title = '';

		if (typeof(nodeParent)!=="undefined") {
			let bg = nodeParent.getAttribute('bg');
			if (bg != null) {
				this._bgColor = bg;
			}
			th = nodeParent.getAttribute('theme');
			if (th != null) {
				if (th=='dark') {
					this._tdark();
				} else if (th=='light') {
					this._tlight();
				}
			}
			this.title = nodeParent.getAttribute('title');
		}
		return (`
			<div class="__app_board__">
				<AppTopBar id="aptop1" theme="`+th+`"></AppTopBar>
				<div class="__init_app_board__"></div>
			</div>
		`);
	}

	render(view) {
		var b = view.bundle;
		this.aptop1 = b.AppTopBar.ID.aptop1;

        this.cPage = view.querySelector(".__app_board__");
		this.cPage.style.position = 'absolute';
		// this.cPage.style.top = '49%';
		// this.cPage.style.bottom = '49%';
		// this.cPage.style.left = '49%';
		// this.cPage.style.right = '49%';
		// this.cPage.style.width = '10px';
		// this.cPage.style.height = '10px';
		// this.cPage.style.opacity = '0.0';
		// this.cPage.style.borderRadius = '50%';
		
		this.cPage.style.opacity = '1';
		this.cPage.style.top = '0px';
		this.cPage.style.bottom = '0px';
		this.cPage.style.left = '0';
		this.cPage.style.right = '0';
		this.cPage.style.width = '100vw';
		this.cPage.style.height = '100vh';
		
		this.cPage.style.overflow = 'hidden';

		this.refreshTheme();
		this.cPage.style.display = 'flex';
		this.cPage.style.flexDirection = 'column';
		this.cPage.style.textRendering = 'optimizeLegibility';
        this.cPage.style.scrollBehavior = 'smooth';
		this.cPage.style.transition = 'all .2s ease-in-out';

        this.elI = view.querySelector(".__init_app_board__");
		this.elI.style.position = 'absolute';
		this.elI.style.top = '40px';
		this.elI.style.bottom = '0';
		this.elI.style.left = '0';
		this.elI.style.right = '0';
		this.elI.style.opacity = '0.0';
		this.elI.style.backgroundColor = this._bgColor;
		this.elI.style.transition = 'all .12s ease-in-out';
		
        setTimeout(() => {
            // this.cPage.style.opacity = '1';
			// this.cPage.style.top = '0px';
			// this.cPage.style.bottom = '0px';
			// this.cPage.style.left = '0';
			// this.cPage.style.right = '0';
			// this.cPage.style.width = '100vw';
			// this.cPage.style.height = '100vh';
			// this.cPage.style.height = 'inherit';
			// this.cPage.style.borderRadius = '0%';
		}, 150);
		
		var ht = this.html;
		this.elI.append(ht);
        setTimeout(() => {
			this.elI.style.opacity = '1';
			this.elI.style.backgroundColor = 'transparent';
			this.aptop1.show();
		}, 400);
		
		this.aptop1.setTitle(this.title);
	}

	onAfterBack() {
		// this.cPage.style.left = '0';
		// this.cPage.style.right = '0';
	}

	onCloseBefore() {
		// this.cPage.style.left = '-50px';
		// this.cPage.style.opacity = '0.2';
	}

	setBackgroundColor(c) {
		this.cPage.style.backgroundColor = c;
	}

	refreshTheme() {
		this.cPage.style.backgroundColor = this._bgColor;
		this.cPage.style.color = this._color;
	}

	theme(t) {
		if (t=='dark') {
			this._tdark();
		} else if (t=='light') {
			this._tlight();
		}
		this.aptop1.theme(t);
		this.refreshTheme();
	}

	_tlight() {
		this._bgColor = '#fff';
		this._color = '#000';
	}

	_tdark() {
		this._bgColor = '#121212';
		this._color = '#fff';
	}

	setTitle(n) {
		this.aptop1.setTitle(n);
	}

}

export default AppBoard;