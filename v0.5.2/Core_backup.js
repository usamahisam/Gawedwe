export class DOMCycle {
	constructor(){
		this.__dom__ = document;
		this.__cnsl__ = console;
		this.__resetDOM();
	}
	__resetDOM(){
		this.__el__ = this.__dom__;
	}
	setElement(e){
		this.__resetDOM();
		return this.__dom__.createElement(e);
	}
	getElement(e, en){
		return e.querySelector(en);
	}
	getElementAll(e, en){
		return e.querySelectorAll(en);
	}
	getTreeElement(e){
		this.__el__ = this.getElement(this.__el__, e);
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
		this.__cnsl__.log(_i);
	}
	w(i){
		this.__cnsl__.warn(i);
	}
	e(i){
		this.__cnsl__.error(i);	
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
		if (this.__el__!=null) {
			if (typeof(h)!=="undefined") {
				this.__el__.appendChild(h);
			} else {
				this.__el__.appendChild(this.htmlComponent);
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
		let n = this.__dom__.createElement(hn);
		n.innerHTML = v;
		return n;
	}
	__onRender(c, cr) {
		c.render(cr, c.root());
	}
	root() {
		return this.__root;
	}
	__render(n) {
		let afterRenderView = this.__createNode(this.__cn, this.view(n));
		let cr = this.__replaceComponents(afterRenderView);
		if (n == undefined) {
			this.__setRegister(afterRenderView);
			this.__root = afterRenderView;
			this.__onRender(this, cr);
		} else {
			this.__root = afterRenderView;
			this.__compressView(n, this, cr);
		}
	}
	__setRegister(e) {
		let ac = this.randomNumbers();
		e.setAttribute('accesskey', ac);
		return ac;
	}
	__regAttribute(a, v) {
		v.removeAttribute('style');
		for (let i = 0; i < a.length; i++) {
			// v.setAttribute(a[i].name, a[i].nodeValue);
		}
	}
	__compressView(e, cc, cr) {
		this.__setRegister(cc.root());
		this.__regAttribute(e.attributes, cc.root());
		e.parentNode.insertBefore(cc.root(), e.nextSibling);
		e.parentNode.removeChild(e);
		cc.__onRender(cc, cr);
	}
	__retGet(it, e, c) {
		let listID = {}, listClass = {}, iID = 0, iClass = 0;
		for (let i = 0; i < e.length; i++) {
			let id = e[i].id;
			let cls = e[i].classList;
			let cc = new c[it](e[i]);
			if (id!=null && id!="") {
				if (typeof(listID[id])==="undefined") {
					listID[id] = cc;
					iID++;
				} else {
					Log.e(e[i].tagName+' duplicated id "'+id+'"');
				}
			}
			if (cls.length > 0) {
				for (let y = 0; y < cls.length; y++) {
					let cn = cls[y];
					if (typeof(listClass[cn])==="undefined") {
						listClass[cn] = [];
					}
					listClass[cn].push(cc);
					iClass++;
				}
			}
		}
		let arr = {};
		if (iID > 0) {
			arr['ID'] = listID;
		}
		if (iClass > 0) {
			arr['CLASS'] = listClass;
		}
		return arr;
	}
	__replaceComponents(hv) {
		let lc = this.regComponents();
		let li = {};
		for (var item in lc) {
			let elAll = hv.querySelectorAll(item);
			li[item] = this.__retGet(item, elAll, lc);
		}
		return li;
	}
}

class GaweApp extends View {
	constructor(){
		super();
		this.listActivities = {};
		this.defaultActivity = null;
		this.tracks = [];
	}
	registryActivity(params){
		let i = 0;
		for (let item in params) {
			if (i==0 && this.defaultActivity==null) {
				this.defaultActivity = item;
			}
			this.listActivities[item] = params[item];
			i++;
		}
	}
	__getPageName(){
		let arr_url = window.location.pathname.split('/');
		let n = arr_url[arr_url.length-1];
		return n;
	}
	__onready(){
		let pushState = history.pushState;
		history.pushState = function(state) {
			pushState.apply(history, arguments);
		}
		let that = this;
		window.onpopstate = function() {
			let n = that.__getPageName();
			alert(n);
		}
	}
	__state(n){
		let l = this.tracks.length;
		if (l > 0) {
			history.pushState({}, null, n);
		}
	}
	__addTrack(n){
		this.__state(n);
		let i = this.tracks.indexOf(n);
		if (i == -1){
			this.tracks.push(n);
		}
	}
	run(){
		this.__addTrack(this.defaultActivity);
		let act = this.listActivities[this.defaultActivity];
		this.__execute(act);
		this.__onready();
	}
	navigate(a){
		this.__addTrack(a);
		let act = this.listActivities[a];
		this.__execute(act);
	}
	__execute(c){
		let l = new c();
		this.display('main', l.root());
		Log.i(this.tracks);
	}
}

export var App = new GaweApp();