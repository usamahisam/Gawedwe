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

let listRegisteredCompBeforeRender = {};

export class Component extends View {
	constructor(lvl){
		super();
		this.level = lvl;
		this.childClassName = this.constructor.name;
		this.tagNameBeforeReplace = "registered_component";
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
	__renderView(v){
		this.setHtmlTag("regcomponent");
		this.setHtmlString(v);
		let query = this.htmlComponent.querySelectorAll("*");
		for(var i = 0; i < query.length; i++) {
			query[i].setAttribute(this.tagNameBeforeReplace, "false");
		}
		return this.htmlComponent.innerHTML;
	}
	__replaceComponents(h) {
		let dc = {};
		let lc = this.regComponents();
		for (var item in lc) {
			let elAll = this.getElementAll(h, item+'['+this.tagNameBeforeReplace+'="false"]');
			for (let i = 0; i < elAll.length; i++) {
				let nc = new lc[item]('component');
				let nP = elAll[i];
				let htmlComp = nc.__render(false, elAll[i]);
				this.setHtmlTag('rep');
				this.setHtmlString(htmlComp.outerHTML);
				if (elAll[i].className != "") {
					this.setClass(item, elAll[i].className);
				}
				if (elAll[i].id != "") {
					this.setID(item, elAll[i].id);
				}
				let ac = Math.random(1, 100000);
				htmlComp.setAttribute('__componentname', item.toLowerCase());
				htmlComp.setAttribute('__componentnumber', i+1);
				htmlComp.setAttribute('accesskey', ac);
				if (elAll[i].className != "") {
					htmlComp.className = elAll[i].className;
				}
				if (elAll[i].id != "") {
					htmlComp.id = elAll[i].id;
				}
				elAll[i].outerHTML = htmlComp.outerHTML;
				/* ----------- */
				dc[ac] = {
					defineClass: nc,
					nodeParent: nP
				};
			}
		}
		return dc;
	}
	__render(isAct = true, nodeParent = null){
		let afterRenderView = this.__renderView(this.view(nodeParent));
		this.setHtmlTag(this.childClassName);
		this.setHtmlString(afterRenderView);
		this.html = this.htmlComponent;
		let dc = this.__replaceComponents(this.html);
		this.htmlComponent = this.html;
		for (var item in dc) {
			listRegisteredCompBeforeRender[item] = dc[item];
		}
		if (isAct) {
			for (var item in listRegisteredCompBeforeRender) {
				let cli = listRegisteredCompBeforeRender[item];
				let elReg = this.htmlComponent.querySelector('[accesskey="'+item+'"]');
				cli.defineClass.render(elReg, cli.nodeParent);
			}
			this.render(this.htmlComponent, nodeParent);
		}
		this.ce = this.html;
		return this.htmlComponent;
	}
	__run() {
		listRegisteredCompBeforeRender = {};
		return this.__render();
	}
}

class GaweApp extends View {
	constructor(){
		super();
		this.listActivities = {};
		this.defaultActivity = null;
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
	running(){
		let act = this.listActivities[this.defaultActivity];
		let l = new act();
		this.display('main', l.__run());
		navigator.serviceWorker.register('sw.js').then(reg => console.log('SW REGISTERED!', reg)).catch(err => console.log('SW ERROR => ', err));
	}
}

export var App = new GaweApp();