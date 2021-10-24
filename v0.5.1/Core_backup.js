export class DOMCycle {
	constructor(){
		this.dom = document;
		this.cnsl = console;
		this.__resetDOM();
	}
	__resetDOM(){
		this.el = this.dom;
	}
	setElement(e){
		this.__resetDOM();
		return this.dom.createElement(e);
	}
	getElement(e, en){
		return e.querySelector(en);
	}
	getElementAll(e, en){
		return e.querySelectorAll(en);
	}
	getTreeElement(e){
		this.el = this.getElement(this.el, e);
		return this;
	}
	replaceString(s, f, r){
		return s.split(f).join(r);
	}
	randomString(l = 8){
		var result = '';
		let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrtuvwxyz0123456789';
		let charactersLength = characters.length;
		for (let i = 0; i < l; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
	randomNumbers(){
		return Math.random(1, 100000);
	}
}

class LogManager extends DOMCycle {
	constructor(){
		super();
	}
	i(_i){
		this.cnsl.log(_i);
	}
	w(i){
		this.cnsl.warn(i);
	}
	e(i){
		this.cnsl.error(i);	
	}
}

export var Log = new LogManager();

export class View extends DOMCycle {
	constructor(){
		super();
		this.__reset();
	}
	__reset(){
		this.listChildElement = [];
		this.htmlComponent = null;
		this.__resetDOM();
	}
	create(e){
		this.se = this.setElement(e);
		this.listChildElement.push(this.se);
		return this;
	}
	style(e, c){
		this.se.style[e] = c;
		return this;
	}
	text(e){
		this.se.innerText = e;
		return this;	
	}
	inset(){
		for (let item in this.listChildElement) {
			if (typeof(this.mel)!=="undefined") {
				this.mel.appendChild(this.listChildElement[item]);
			}
			this.mel = this.listChildElement[item];
		}
		this.htmlComponent = this.listChildElement[0];
	}
	display(e, h){
		this.getTreeElement(e);
		if (this.el!=null) {
			if (typeof(h)!=="undefined") {
				this.el.appendChild(h);
			} else {
				this.el.appendChild(this.htmlComponent);
			}
			this.__reset();
		} else {
			Log.i("Display "+e+" is not found!");
		}
		this.__reset();
	}
	setHtmlTag(n, c){
		this.ce = this.setElement(n);
		if (typeof(c)!=="undefined") {
			c(this.ce.style);
		}
	}
	setHtmlString(h) {
		if (typeof(this.ce)==="undefined") {
			this.ce = this.setElement('notag');
		}
		this.ce.innerHTML = h;
		this.htmlComponent = this.ce;
	}
	passElement(t){
		let g = this.getElement(this.ce, t);
		if (g==null) {
			Log.i("Element `"+t+"` is not found!");
			return;
		} else {
			return g;
		}
	}
	stylesheetPrimary(c){
		c(this.ce.style);
	}
	stylesheet(t, c){
		let g = this.passElement(t);
		c(g.style);
	}
	setText(t, tx){
		let g = this.passElement(t);
		g.innerText = tx;
	}
	setHtml(t, tx){
		let g = this.passElement(t);
		g.innerHTML = tx;
	}
	setAttr(t, x, tx){
		let g = this.passElement(t);
		g.setAttribute(x, tx);
	}
	appendHtml(t, tx){
		let g = this.passElement(t);
		g.innerHTML += tx;
	}
	setClass(t, tx){
		if (tx!=null && tx!="") {
			let g = this.passElement(t);
			g.className = tx;
		}
	}
	setID(t, tx){
		if (tx!=null && tx!="") {
			let g = this.passElement(t);
			g.id = tx;
		}
	}
	getAttr(t, tx){
		let g = this.passElement(t);
		return g.getAttribute(tx);
	}
	getClass(t){
		return this.getAttr(t, 'class');
	}
	getID(t){
		return this.getAttr(t, 'id');
	}
}

export class Component extends View {
	constructor(n){
		super(n);
		this.__childClassName = this.constructor.name;
		this.viewComponent = this.__render(n);
	}
	view(){
		Log.w("Component `"+this.__childClassName+"` View is not found");
	}
	render(){
		Log.w("Component `"+this.__childClassName+"` Render is not found");
	}
	regComponents(){
		return {};
	}
	__createNode(hn, v){
		let n = this.dom.createElement(hn);
		n.innerHTML = v;
		return n;
	}
	__render(n) {
		let afterRenderView = this.__createNode(this.__childClassName, this.view(n));
		let cr = this.__replaceComponents(afterRenderView);
		this.__componentRegistry(afterRenderView, cr);
		if (n == undefined) {
			this.render(this);
		}
		return afterRenderView;
	}
	__replaceComponents(hv) {
		this.listAccessKey = {};
		let lc = this.regComponents();
		let cr = {};
		for (var item in lc) {
			let elAll = hv.querySelectorAll(item);
			cr[item] = {};
			for (let i = 0; i < elAll.length; i++) {
				let cc = new lc[item](elAll[i]);
				let ac = this.randomNumbers();
				cc.viewComponent.setAttribute('__componentname', item.toLowerCase());
				cc.viewComponent.setAttribute('__componentnumber', i+1);
				cc.viewComponent.setAttribute('accesskey', ac);
				if (elAll[i].className != "") {
					cc.viewComponent.className = elAll[i].className;
				}
				if (elAll[i].id != "") {
					cc.viewComponent.id = elAll[i].id;
				}
				elAll[i].appendChild(cc.viewComponent);
				cr[item][ac] = cc;
				this.listAccessKey[ac] = item;
			}
		}
		return cr;
	}
	__compressView(v, it, func) {
		let n = v.querySelector('[accesskey="'+it+'"]');
		// func.viewComponent = n;
		return func;
	}
	__componentRegistry(v, l) {
		this.childElement = l;
		for (var i in l) {
			let itn = l[i];
			for (var i2 in itn) {
				let dil = itn[i2].__compressView(v, i2, itn[i2]);
				itn[i2].render(dil);
			}
		}
	}
}

class GaweApp extends View {
	constructor(){
		super();
		this.listActivities = {};
		this.defaultActivity = null;
		this.startWorker();
	}
	registryActivity(params){
		let i = 0;
		for (let item in params) {
			if (i==0) {
				this.defaultActivity = item;
			}
			this.listActivities[item] = params[item];
			i++;
		}
	}
	startWorker(){
		navigator.serviceWorker.register('sw.js').then(reg => console.log('SW REGISTERED!', reg)).catch(err => console.log('SW ERROR => ', err));
	}
	running(){
		let act = this.listActivities[this.defaultActivity];
		let l = new act();
		this.display('main', l.viewComponent);
	}
}

export var App = new GaweApp();