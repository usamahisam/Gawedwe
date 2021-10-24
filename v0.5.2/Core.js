export class DOMCycle {
	constructor(){
		this.__dom__ = document;
		this.__cnsl__ = console;
		this.__resetDOM();
	}
	__resetDOM(){
		this.__el__ = this.__dom__;
	}
	__setElement(e){
		this.__resetDOM();
		return this.__dom__.createElement(e);
	}
	__getElement(e, en){
		return e.querySelector(en);
	}
	__getElementAll(e, en){
		return e.querySelectorAll(en);
	}
	__getTreeElement(e){
		this.__el__ = this.__getElement(this.__el__, e);
		return this;
	}
	__replaceString(s, f, r){
		return s.split(f).join(r);
	}
	__randomString(l = 8){
		var result = '';
		let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrtuvwxyz0123456789';
		let charactersLength = characters.length;
		for (let i = 0; i < l; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
	__randomNumbers(){
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
		this.se = this.__setElement(e);
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
		this.__getTreeElement(e);
		let x;
		if (this.__el__!=null) {
			if (typeof(h)!=="undefined") {
				x = h;
				this.__el__.appendChild(h);
			} else {
				x = this.htmlComponent;
				this.__el__.appendChild(this.htmlComponent);
			}
			this.__reset();
		} else {
			Log.i("Display "+e+" is not found!");
		}
		this.__reset();
		return x;
	}
	removeDisplay(e, n){
		let y = this.__dom__.getElementsByTagName(n);
		y[0].parentNode.removeChild(y[0]);
	}
	setHtmlTag(n, c){
		this.ce = this.__setElement(n);
		if (typeof(c)!=="undefined") {
			c(this.ce.style);
		}
	}
	setHtmlString(h) {
		if (typeof(this.ce)==="undefined") {
			this.ce = this.__setElement('notag');
		}
		this.ce.innerHTML = h;
		this.htmlComponent = this.ce;
	}
	passElement(t){
		let g = this.__getElement(this.ce, t);
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
	onReady(){
		Log.w("`"+this.__cn+"` App onReady i required.");
	}
	regComponents(){
		return {};
	}
	__createNode(hn, v){
		let n = this.__dom__.createElement("X"+hn);
		n.innerHTML = v;
		return n;
	}
	__onRender(c) {
		c.render(c._view);
	}
	__render(n) {
		let afterRenderView = this.__createNode(this.__randomString(8), this.view(n)); // this.__cn
		let cr = this.__replaceComponents(afterRenderView);
		if (n == undefined) {
			this.__setRegister(afterRenderView);
			this._view = afterRenderView;
			if (cr.i > 0) {
				this._view["bundle"] = cr.li;
			}
			this.__onRender(this);
		} else {
			this._view = afterRenderView;
			if (cr.i > 0) {
				this._view["bundle"] = cr.li;
			}
			this.__compressView(n, this);
		}
	}
	__setRegister(e) {
		let ac = this.__randomNumbers();
		e.setAttribute('accesskey', ac);
		return ac;
	}
	__regAttribute(a, v) {
		v.removeAttribute('style');
		for (let i = 0; i < a.length; i++) {
			// v.setAttribute(a[i].name, a[i].nodeValue);
		}
	}
	__compressView(e, cc) {
		this.__setRegister(cc._view);
		this.__regAttribute(e.attributes, cc._view);
		e.parentNode.insertBefore(cc._view, e.nextSibling);
		e.parentNode.removeChild(e);
		cc.__onRender(cc);
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
			} else {
				Log.w(e[i].tagName+' id not found');
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
		let i = 0;
		let li = {};
		for (var item in lc) {
			let elAll = hv.querySelectorAll(item);
			li[item] = this.__retGet(item, elAll, lc);
			i++;
		}
		if (i > 0) {
			this._child = li;
		}
		return {i:i,li:li};
	}
}

class GaweApp extends View {
	constructor(){
		super();
		this.listActivities = {};
		this.defaultActivity = null;
		this.tracks = [];
		this.elDis = {};
		this.regComps = {};
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
	__startup(){
		let pushState = history.pushState;
		history.pushState = function(state) {
			pushState.apply(history, arguments);
		}
		let that = this;
		window.onpopstate = function(){
			that.__onpopstate(that);
		}
	}
	__onpopstate(n, m){
		if (typeof(n) === "object") {
			let a = n.__getPageName();
			n.__ngeTrack(a);
		} else {
			this.__ngeTrack(n, m);
		}
	}
	__ngeTrack(n, m){
		let i = this.tracks.indexOf(n);
		let bn = this.tracks[this.tracks.length-1];
		if (i == -1){
			history.pushState({}, null, n);
			this.tracks.push(n);
		}
		let ia = this.tracks.indexOf(n);
		let c = this.tracks.length-1;

		if (bn == n) {
			Log.w(" <====> ");
		} else {
			if (c == ia) { // next
				this.__viewing(n);
			} else { // back
				if (m) {
					history.go(-1);
				} else {
					this.regComps[n].onReady();
					this.__clearViewing(this.tracks[c]);
					this.tracks.splice(this.tracks.indexOf(bn), 1);
				}
			}
		}
	}
	run(){
		this.__startup();
		this.__ngeTrack(this.defaultActivity);
	}
	navigate(a){
		this.__onpopstate(a, true);
	}
	__viewing(n){
		let act = this.listActivities[n];
		let l = new act();
		let r = this.display('main', l._view);
		l.onReady();
		this.regComps[n] = l;
		this.elDis[n] = r.tagName;
	}
	__clearViewing(n){
		this.removeDisplay('main', this.elDis[n]);
		delete this.elDis[n];
		delete this.regComps[n];
	}
}

export var App = new GaweApp();