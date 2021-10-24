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
	constructor(){
		super();
		this.childClassName = this.constructor.name;
	}
	view(){
		Log.w("Component `"+this.childClassName+"` View is not found");
	}
	render(){
		Log.w("Component `"+this.childClassName+"` Render is not found");
	}
	regComponents(){
		return {};
	}
	__replaceComponents(){
		let h = this.htmlComponent;
		let lc = this.regComponents();
		for (let item in lc) {
			let tagName = item.toLowerCase();
			let c = new lc[item]();
			let elAll = this.getElementAll(h, tagName);
			for (let i = 0; i < elAll.length; i++) {
				let htmlComp = c.__render(elAll[i]);
				this.setHtmlTag('rep');
				this.setHtmlString(htmlComp.outerHTML);
				this.setClass(tagName, elAll[i].className);
				this.setID(tagName, elAll[i].id);
				elAll[i].outerHTML = this.htmlComponent.innerHTML;
			}
		}
	}
	__render(it = null){
		this.setHtmlTag(this.childClassName);
		this.ce.setAttribute('_component_status', 'unregistered');
		this.setHtmlString(this.view());
		this.render(it);
		this.html = this.htmlComponent;
		this.__replaceComponents();
		this.htmlComponent = this.html;
		this.ce = this.html;
		return this.htmlComponent;
	}
	addContent(t, tx) {
		// this.setHtmlTag('rep');
		// this.setHtmlString(tx);
		// this.__reset();
		// Log.w(this.htmlComponent);
		this.appendHtml(t, tx);
	}
}

export class App extends View {
	constructor(){
		super();
	}
	registryActivity(...params){
		for (let item in params) {
			let l = new params[item]();
			this.display('main', l.__render());
		}
	}
}