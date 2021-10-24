import View from './view.js';
import Log from './log.js';
import __MOCK__ from './mockhv.js';
import Component from './component.js';

class Core extends View {
	constructor(){
		super();
		this.__i__ = 0;
		this.__listFrames__ = [];
		this.__ifFrame__ = null;
		this.__listViewR__ = {};
		this.__numberViewMenu__ = 0;
		this.__listMenus__ = {};
		this.__defaultMenu__ = null;
		this.__tracks__ = [];
		this.__elDis__ = {};
		this.__regComps__ = {};
		this.__post__ = null;
		this.__baseMenu__ = 'main';
	}
	createFrame(n) {
		this.__ifFrame__ = n;
		this.__listFrames__.push(n);
		return this;
	}
	viewState(v, t) {
		this.__listViewR__[this.__ifFrame__] = [v, t];
	}
	mainActivity(params){
		for (let item in params) {
			if (this.__numberViewMenu__==0 && this.__defaultMenu__==null) {
				this.__defaultMenu__ = item;
			}
			this.__listMenus__[item] = {
				frame: this.__ifFrame__,
				name: params[item],
			};
			this.__numberViewMenu__++;
		}
	}
	__getPageName(){
		let arr_url = this.__self__.window.location.pathname.split('/');
		let n = arr_url[arr_url.length-1];
		return n;
	}
	__startup(){
		let pushState = this.__self__.history.pushState;
		this.__self__.history.pushState = function(state) {
			pushState.apply(history, arguments);
		}
		let that = this;
		this.__self__.window.onpopstate = function(){
			that.__onpopstate(that);
		}
	}
	__onpopstate(n, m){
		if (typeof(n) === "object") {
			let a = n.__getPageName();
			if (a == "") {
				this.__self__.history.go(1);
				// this.run();
				// this.__self__.window.location.reload();
			} else {
				n.__ngeTrack(a);
			}
		} else {
			this.__ngeTrack(n, m);
		}
	}
	__ngeTrack(n, m){
		if (typeof(this.__listMenus__[n]) !== 'undefined') {
			let i = this.__tracks__.indexOf(n);
			let bn = this.__tracks__[this.__tracks__.length-1];
			if (i == -1){
				this.__self__.history.pushState({}, null, n);
				this.__tracks__.push(n);
			}
			let ia = this.__tracks__.indexOf(n);
			let c = this.__tracks__.length-1;

			if (bn == n) {
				Log.w(" <====> ");
			} else {
				if (c == ia) { // next
					this.__i__++;
					__MOCK__.ISREADY(() => {
						this.__viewing(n);
					});
				} else { // back
					if (m) {
						this.__self__.history.go(-1);
					} else {
						this.__i__--;
						__MOCK__.ISREADY(() => {
							this.__regComps__[n].widgetReady(this.__post__);
							this.__clearViewing(this.__tracks__[c]);
							this.__tracks__.splice(this.__tracks__.indexOf(bn), 1);
						});
					}
				}
			}
		} else {
			Log.w('null');
		}
	}
	run(){
		this.__startup();
		this.__ngeTrack(this.__defaultMenu__);
	}
	navigate(a, data = null){
		console.log(this.__listMenus__);
		console.log(a);
		this.__post__ = data;
		let i = this.__listMenus__[a];
		if (i !== -1){
			this.__onpopstate(a, true);
		} else {
			Log.e('View Menu '+a+' not found.');
		}
	}
	close(){
		this.__self__.history.go(-1);
	}
	__viewing(n){
		let ib = this.__tracks__.indexOf(n)-1;
		let nb = this.__tracks__[ib];
		if (typeof(nb)!=="undefined") {
			let yb = this.__regComps__[nb].__he__;
			for (var item in yb) {
				this.__widgetCovered(yb[item]);
			}
			var sf = this.__listMenus__[nb].frame;
			if (typeof(this.__listViewR__[sf])!=="undefined") {
				if (this.__tracks__.indexOf(nb) > -1) {
					this.__listViewR__[sf][0]('covered', this.__regComps__[nb]._view);
				}
			}
			this.__widgetCovered(this.__regComps__[nb]);
		}
		let cd = this.__listMenus__[n];
		let f = cd.frame;
		let act = cd.name;
		let l = new act();
		l._view.style.position = 'absolute';
		l._view.style.display = 'flex';
		l._view.style.overflow = 'hidden';
		l._view.style.width = '100vw';
		l._view.style.height = '100vh';
		if (typeof(this.__listViewR__[f])!=="undefined") {
			var rf = 'ready';
			if (this.__i__ > 1) {
				rf = 'open';
			}
			this.__listViewR__[f][0](rf, l._view);
		}
		this.__openDisplay(n, l);
	}
	__openDisplay(n, l) {
		let r = this.display(this.__baseMenu__, l._view);
		for (var item in l.__he__) {
			this.__widgetReady(l.__he__[item]);
		}
		this.__widgetReady(l);
		this.__regComps__[n] = l;
		this.__elDis__[n] = r.tagName;
	}
	__clearViewing(n){
		let ib = this.__tracks__.indexOf(n)-1;
		let nb = this.__tracks__[ib];
		if (typeof(nb)!=="undefined") {
			let yb = this.__regComps__[nb].__he__;
			for (var item in yb) {
				this.__widgetCoveredClose(yb[item]);
			}
			let sf = this.__listMenus__[nb].frame;
			if (typeof(this.__listViewR__[sf])!=="undefined") {
				this.__listViewR__[sf][0]('coveredclose', this.__regComps__[nb]._view);
			}
			this.__widgetCoveredClose(this.__regComps__[nb]);
		}
		let y = this.__regComps__[n].__he__;
		for (var item in y) {
			this.__widgetClose(y[item]);
		}
		this.__widgetClose(this.__regComps__[n]);
		let f = this.__listMenus__[n].frame;
		if (typeof(this.__listViewR__[f])!=="undefined") {
			this.__listViewR__[f][0]('close', this.__regComps__[n]._view);
			this.__deleteDisplay(n, this.__listViewR__[f][1]+100);
		} else {
			this.__deleteDisplay(n, 10);
		}
	}
	async __deleteDisplay(n, t) {
		await __MOCK__.SLEEP(t);
		this.removeDisplay(this.__baseMenu__, this.__elDis__[n]);
		delete this.__elDis__[n];
		delete this.__regComps__[n];
	}
	__widgetReady(l){
		if (typeof(l)!=="undefined") {
			if (typeof(l.widgetReady)!=="undefined") {
				l.widgetReady(this.__post__);
			}
		}
	}
	__widgetClose(l){
		if (typeof(l)!=="undefined") {
			if (typeof(l.widgetClose)!=="undefined") {
				l.widgetClose();
			}
		}
	}
	__widgetCovered(l){
		if (typeof(l)!=="undefined") {
			if (typeof(l.widgetCovered)!=="undefined") {
				l.widgetCovered();
			}
		}
	}
	__widgetCoveredClose(l){
		if (typeof(l)!=="undefined") {
			if (typeof(l.widgetCoveredClose)!=="undefined") {
				l.widgetCoveredClose();
			}
		}
	}
}

export var App = new Core();

export {
	Component
}