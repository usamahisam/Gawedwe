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
		// this.ce.innerHTML = this.replaceString(h, 'style', '[removed]');
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
	setHtmlText(t, tx){
		let g = this.passElement(t);
		g.innerText = tx;
	}
	setHtml2HtmlString(t, tx){
		let g = this.passElement(t);
		g.innerHTML = tx;
	}
	setHtmlAppendString(t, tx){
		let g = this.passElement(t);
		g.innerHTML += tx;
	}
	setHtmlClass(t, tx){
		if (tx!=null && tx!="") {
			let g = this.passElement(t);
			g.className = tx;
		}
	}
	setHtmlID(t, tx){
		if (tx!=null && tx!="") {
			let g = this.passElement(t);
			g.id = tx;
		}
	}
}

let listComponents = {};
let listActivities = {};

export class Component extends View {
	constructor(){
		super();
		this.childClassName = this.constructor.name;
		this.__render();
		listComponents[this.childClassName] = this;
		return this;
	}
	view(){
		Log.w("Component `"+this.childClassName+"` View is not defined");
	}
	render(){
		Log.w("Component `"+this.childClassName+"` Render is not defined");
	}
	__render(){
		this.setHtmlTag(this.childClassName);
		this.setHtmlString(this.view());
		this.render();
		return this.htmlComponent;
	}
}

export class Activity extends View {
	constructor(){
		super();
		this.childClassName = this.constructor.name;
		listActivities[this.childClassName] = this;
		this.__render();
		return this;
	}
	view(){
		Log.w("Activity `"+this.childClassName+"` View is not defined");
	}
	oncreate(){
		Log.w("Activity `"+this.childClassName+"` Oncreate is not defined");	
	}
	__replaceComponents(){
		this.html = this.htmlComponent;
		for (let item in listComponents) {
			let tagnName = item.toLowerCase();
			let htmlComp = listComponents[item].htmlComponent;
			let elAll = this.getElementAll(this.htmlComponent, tagnName);
			for (let i = 0; i < elAll.length; i++) {
				this.setHtmlTag('rep');
				this.setHtmlString(htmlComp.outerHTML);
				this.setHtmlClass(tagnName, elAll[i].className);
				this.setHtmlID(tagnName, elAll[i].id);
				this.setHtmlAppendString(tagnName, elAll[i].innerHTML);
				elAll[i].outerHTML = this.htmlComponent.innerHTML;
			}
		}
	}
	__render(){
		this.setHtmlTag('activity-'+this.childClassName);
		this.setHtmlString(this.view());
		this.__replaceComponents();
		this.htmlComponent = this.html;
		this.oncreate();
		this.display('main', this.htmlComponent);
		return this.htmlComponent;
	}
}

export class App extends View {
	constructor(){
		super();
	}
	registryComponents(...params){
		for (let item in params) {
			new params[item]();
		}
		Log.i(listComponents);
	}
	registryActivity(params){
		for (let item in params){
			new params[item]();
		}
		Log.i(listActivities);
	}
}