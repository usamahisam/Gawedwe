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
		this.__lcE = [];
		this.htmlComponent = null;
		this.__resetDOM();
	}
	create(e){
		this.se = this.setElement(e);
		this.__lcE.push(this.se);
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
		for (let item in this.__lcE) {
			if (typeof(this.mel)!=="undefined") {
				this.mel.appendChild(this.__lcE[item]);
			}
			this.mel = this.__lcE[item];
		}
		this.htmlComponent = this.__lcE[0];
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

export class Component extends DOMCycle {
	constructor(n){
		super(n);
		this.__cn = this.constructor.name;
		this.__render(n);
	}
	view(){
		Log.w("Component `"+this.__cn+"` View is not found");
	}
	render(){
		Log.w("Component `"+this.__cn+"` Render is not found");
	}
	regComponents(){
		return {};
	}
	__createNode(hn, v){
		let n = this.dom.createElement(hn);
		n.innerHTML = v;
		return n;
	}
	__onRender(c) {
		c.render(c.get, c.viewComponent);
	}
	__render(n) {
		let afterRenderView = this.__createNode(this.__cn, this.view(n));
		let cr = this.__replaceComponents(afterRenderView);
		if (n == undefined) {
			this.__setRegister(afterRenderView, this.__cn);
			this.viewComponent = afterRenderView;
			this.__onRender(this);
		} else {
			this.viewComponent = afterRenderView;
		}
	}
	__setRegister(e, it, i = 0) {
		let ac = this.randomNumbers();
		e.setAttribute('__componentname', it.toLowerCase());
		e.setAttribute('__componentnumber', i+1);
		e.setAttribute('accesskey', ac);
		return ac;
	}
	__compressView(e, cc) {
		e.innerHTML = '';
		cc.viewComponent.setAttribute('__cc__', 'true');
		e.append(cc.viewComponent);
		cc.__onRender(cc);
	}
	__replaceComponents(hv) {
		let lc = this.regComponents();
		this.get = {};
		for (var item in lc) {
			let elAll = hv.querySelectorAll(item);
			this.get[item] = {};
			let it2 = 0;
			for (let i = 0; i < elAll.length; i++) {
				let cc = new lc[item](elAll[i]);
				let ac = this.__setRegister(elAll[i], item, i);
				this.__compressView(elAll[i], cc);
				if (i == 0) {
					this.get[item] = cc;
				} else if (i == 1) {
					this.get[item][it2] = this.get[item];
					it2++;
					this.get[item][it2] = cc;
					it2++;
				} else if (i > 1) {
					this.get[item][it2] = cc;
					it2++;
				}
			}
		}
		return this.get;
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