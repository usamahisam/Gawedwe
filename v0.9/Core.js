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

class JJVM {
	constructor(){
		Log.i('Jancok Javascript Virtual Machine (JJVM) -- Starting...');
		Log.i(this.MEMORY);
		Log.i(this.GPU);
		this._listSpeedMeasure = [];
		this._totalSpeedMeasure = 0;
		this._avgSpeedMeasure = 0;
		this._minSpeedMeasure = 0;
		this._maxSpeedMeasure = 0;
		this._numberLowMeasure = 0;
		this.CHECKMEASURE(0, 10);
	}

	get MEMORYUSEDKB() {
		return Math.round(this.MEMORY.usedJSHeapSize * 100 /1024) / 100;
	}

	get PERF() {
		return window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
	}

	get MEMORY() {
		return this.PERF.memory;
	}

	get INFO_PERF() {
		for (var value in this.PERF) {
			Log.i(value);
		}	  
	}
	
    GETUNMASKEDINFO(gl) {
		var unMaskedInfo = {
		  renderer: '',
		  vendor: ''
		};
		var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");
		if (dbgRenderInfo != null) {
		  unMaskedInfo.renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
		  unMaskedInfo.vendor = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
		}
		return unMaskedInfo;
	}

	get GPU() {
		var canvas;
		canvas = document.getElementById("_glcanvas_");
		var gl = canvas.getContext("experimental-webgl");
		return {
			pRender: gl.getParameter(gl.RENDERER),
			pVendor: gl.getParameter(gl.VENDOR),
			uRender: this.GETUNMASKEDINFO(gl).vendor,
			uRender: this.GETUNMASKEDINFO(gl).renderer,
		}
	}

	SYSMEASUREMENT(timeFrame) {
		var sysm = 0;
		var start = new Date().getTime();
		var end   = new Date().getTime();
		while (end - start < timeFrame) {
		  sysm++;
		  end = new Date().getTime();
		}
		return sysm;
	}

	CHECKMEASURE(s, t) {
		s++;
		var c = this.CPUCLOCK;
		this._listSpeedMeasure.push(c);
		this._totalSpeedMeasure += c;
		if (s < t) {
			this.CHECKMEASURE(s, t);
		} else {
			this._avgSpeedMeasure = Math.round(this._totalSpeedMeasure/t);
			this._minSpeedMeasure = Math.min(...this._listSpeedMeasure);
			this._maxSpeedMeasure = Math.max(...this._listSpeedMeasure);
			Log.i('CPU clock min : '+this._minSpeedMeasure);
			Log.i('CPU clock max : '+this._maxSpeedMeasure);
			Log.i('CPU clock rate : '+this._avgSpeedMeasure); // rata rata speed
		}
	}
	
	get CPUCLOCK() {
		return this.SYSMEASUREMENT(10); // watch clock
	}

	async SLEEP(ms) {
		return await new Promise(resolve => setTimeout(resolve, ms));
	}

	async ISREADY(r) {
		var c = this.CPUCLOCK;
		Log.i("CPU clock : "+c);
		if (c >= this._avgSpeedMeasure) {
			await r();
			this._numberLowMeasure = 0;
		} else if (c < this._minSpeedMeasure) {
			this._numberLowMeasure++;
			if (this._numberLowMeasure > 10) {
				await this.CHECKMEASURE(0, 10);
			} else {
				await this.SLEEP(1);
			}
			this.ISREADY(r);
		} else {
			await this.ISREADY(r);
		}
	}
}

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
		this.__he__ = [];
		this._attr = [];
		this.__render(n);
	}
	view(){
		Log.w("Component `"+this.__cn+"` View is not found");
	}
	render(){
		Log.w("Component `"+this.__cn+"` Render is not found");
	}
	onReady(p){
		// Log.w("`"+this.__cn+"` App onReady i required.");
	}
	onClose(){
	}
	onCloseBefore(){
	}
	onAfterBack(){
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
		this._attr = e.attributes;
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
			this.__he__.push(cc);
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

class GaweAppSekoUshamaMustikohisam extends View {
	constructor(){
		super();
		this.__VM__ = new JJVM();
		this.__i__ = 0;
		this.listActivities = {};
		this.defaultActivity = null;
		this.tracks = [];
		this.elDis = {};
		this.regComps = {};
		this.menuParams = {};
		this.__post__ = null;
		this.baseActivity = 'main';
	}
	Activity(params){
		let i = 0;
		for (let item in params) {
			if (i==0 && this.defaultActivity==null) {
				this.defaultActivity = item;
			}
			this.listActivities[item] = params[item];
			i++;
		}
	}
	Menu(params){
		for (let item in params) {
			this.menuParams['__anjkcduascuafcaiucgbadfbaibgcu__'+item] = params[item];
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
			if (a == "") {
				history.go(1);
				// this.run();
				// window.location.reload();
			} else {
				n.__ngeTrack(a);
			}
		} else {
			this.__ngeTrack(n, m);
		}
	}
	async __ngeTrack(n, m){
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
				await this.__VM__.ISREADY(() => {
					this.__viewing(n);
				});
			} else { // back
				if (m) {
					await history.go(-1);
				} else {
					await this.__VM__.ISREADY(() => {
						this.regComps[n].onReady(this.__post__);
						this.__clearViewing(this.tracks[c]);
						this.tracks.splice(this.tracks.indexOf(bn), 1);
					});
				}
			}
			this.__i__++;
		}
	}
	async run(){
		for (let item in this.menuParams) {
			this.listActivities[item] = this.menuParams[item];
		}
		this.__startup();
		await this.__ngeTrack(this.defaultActivity);
	}
	async navigate(a, data = null){
		this.__post__ = data;
		await this.__onpopstate(a, true);
	}
	openMenu(a){
		this.__onpopstate('__anjkcduascuafcaiucgbadfbaibgcu__'+a, true);
	}
	async close(){
		await history.go(-1);
	}
	__viewing(n){
		let ib = this.tracks.indexOf(n)-1;
		let nb = this.tracks[ib];
		if (typeof(nb)!=="undefined") {
			let yb = this.regComps[nb].__he__;
			for (var item in yb) {
				this.__widgetCloseBefore(yb[item]);
			}
			this.__widgetCloseBefore(this.regComps[nb]);
		}
		let act = this.listActivities[n];
		let l = new act();
		l._view.style.position = 'absolute';
		l._view.style.display = 'flex';
		l._view.style.overflow = 'hidden';
		l._view.style.width = '100vw';
		l._view.style.height = '100vh';
		if (this.__i__ > 0 && typeof(this.__animOp__)!=="undefined") {
			this.__animOp__[0](l._view.style);
			l._view.style.transition = 'all '+(this.__animOp__[1]/1000)+'s cubic-bezier(0.61, 1.04, 1, 1)';
			this.__openDisplay(n, l, this.__animOp__[1]);
		} else {
			this.__openDisplay(n, l, 100);
		}
	}
	__openDisplay(n, l, t) {
		// setTimeout(() => {
			let r = this.display(this.baseActivity, l._view);
			for (var item in l.__he__) {
				this.__widgetReady(l.__he__[item]);
			}
			this.__widgetReady(l);
			this.regComps[n] = l;
			this.elDis[n] = r.tagName;
		// }, 1);
	}
	__clearViewing(n){
		let ib = this.tracks.indexOf(n)-1;
		let nb = this.tracks[ib];
		if (typeof(nb)!=="undefined") {
			let yb = this.regComps[nb].__he__;
			for (var item in yb) {
				this.__widgetAfterBack(yb[item]);
			}
			this.__widgetAfterBack(this.regComps[nb]);
		}

		//
		let y = this.regComps[n].__he__;
		for (var item in y) {
			this.__widgetClose(y[item]);
		}
		this.__widgetClose(this.regComps[n]);
		if (typeof(this.__animCl__)!=="undefined") {
			this.regComps[n]._view.style.transition = 'all '+(this.__animCl__[1]/1000)+'s ease-in-out';
			this.__animCl__[0](this.regComps[n]._view.style);
			this.__deleteDisplay(n, this.__animCl__[1]);
		} else {
			this.__deleteDisplay(n, 10);
		}
	}
	__deleteDisplay(n, t) {
		setTimeout(() => {
			this.removeDisplay(this.baseActivity, this.elDis[n]);
			delete this.elDis[n];
			delete this.regComps[n];
		}, t);
	}
	animateOpen(s, t) {
		// animate if back history
		this.__animOp__ = [s, t];
	}
	animateClose(s, t) {
		// animate if back history
		this.__animCl__ = [s, t];
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
	__widgetCloseBefore(l){
		if (typeof(l)!=="undefined") {
			if (typeof(l.widgetCloseBefore)!=="undefined") {
				l.widgetCloseBefore();
			}
		}
	}
	__widgetAfterBack(l){
		if (typeof(l)!=="undefined") {
			if (typeof(l.widgetAfterBack)!=="undefined") {
				l.widgetAfterBack();
			}
		}
	}
}

export var App = new GaweAppSekoUshamaMustikohisam();