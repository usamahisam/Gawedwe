class DOMManager {
	constructor(init){
		this.__d__ = document;
		this.__w__ = window;
		this.__c__ = console;
		this.__h__ = history;
	}
	setElement(e){
		this.__x__ = this.__d__.createElement(e);
		return this.__x__;
	}
	getElement(s){
		this.__x__ = this.__d__.querySelector(s);
		return this.__x__;
	}
	setAttribute(e, v){
		this.__x__.setAttribute(e, v);
	}
	appendChild(n){
		this.__x__.appendChild(n);
	}
	removeChild(n){
		this.__x__.removeChild(n);
	}
	log(i){
		this.__c__.log(i);
	}
	warn(i){
		this.__c__.warn(i);
	}
	error(i){
		this.__c__.error(i);	
	}
}

class View extends DOMManager {
	constructor(__m__){
		super(__m__);
		this.__m__ = __m__;
		this.__ccn__ = this.__proto__.constructor.name;
		this.__e__ = this.getElement("app-main");
	}
	onCreate(){
		this.warn(this.__m__.in+" onCreate is not defined");
	}
	style(css){
		this.warn(this.__m__.in+" Style is not defined");
	}
	view(){
		this.warn("View is not defined");
		return VIEW_ERROR_CONTENT_OPEN+'Kosong Bro'+VIEW_ERROR_CONTENT_CLOSE;
	}
	template(){
		this.error("Template not found in Class "+this.__ccn__+"");
		return VIEW_ERROR_CONTENT_OPEN+'Template Kosong Bro'+VIEW_ERROR_CONTENT_CLOSE;
	}
	cssTemplate(css){
		this.warn(this.__m__.in+" Style Template is not defined");
	}
	afterRender(){
	}
	// onBack(){ // for child component
	// }
	async deletePage(n){
		let i = tracks.indexOf(n);
		tracks.splice(i, 1);
		let d = this.getElement("#"+n);
		await this.__e__.removeChild(d);
	}
	async __removePageTrash__(index, lindex){
		let i = index>=lindex?lindex:index;
		let li = index>=lindex?index:lindex;
		let nt = tracks.slice(i+1, li);
		for (var ia in nt){
			await this.deletePage(nt[ia]);
		}
	}
	__defStyleTemplate__(node){
		if (tracks.length!=1) {
			let sty = new Style(node);
			this.cssTemplate((e, v) => {
				e=="@"?sty.css(v):sty.child(e).css(v);
			});
		}
		return node;
	}
	__defStyle__(){
		let sty = new Style(this.__ccn__.toLowerCase());
		this.style((e, v) => {
			e=="@"?sty.css(v):sty.child(e).css(v);
		});
	}
	__render__(){
		let v = this.template();
		let node = this.setElement("div");
		node.innerHTML = v;
		let afterCss = this.__defStyleTemplate__(node.firstChild);
		this.__e__.appendChild(afterCss);
		if (tracks.length!=1) {
			this.afterRender();
		}
		this.__defStyle__();
		return v;
	}
	async __nav__(n, onreturn){
		let currName = tracks[tracks.length-1];
		let currNumber = pageByName[currName];
		let currIndex = tracks.indexOf(currName);
		trackRegistry(n);
		let index = tracks.indexOf(n);
		if (index > currIndex){ // next
			this.log("NEXT PAGE");
			await onreturn(true);
		} else if (index < currIndex){ // prev
			this.log("PREV PAGE");
			await this.__removePageTrash__(index, currIndex);
			let lastName = tracks[tracks.length-1];
			if (typeof(this.onBack)!=="undefined"){
				await this.onBack(lastName);
			} else {
				await this.deletePage(lastName);
			}
			await onreturn(false);
		} else { // not change
			this.log("PAGE NOT CHANGE");
		}
	}
}

class Component extends DOMManager {
	constructor(name, init){
		super(init);
		this.id = this.getElement(name);
		this.definePage = definePage;
		this.in = this.definePage.in;
	}
	click(f){
		this.id.addEventListener("click", (e) => {
			e.stopImmediatePropagation();
			f(e);
		});
	}
}

class Style extends DOMManager {
	constructor(n){
		super();
		if (typeof(n.style)!=="undefined") {
			this.els = n;
		} else {
			this.els = this.getElement('#'+n);
		}
		this.reels = this.els;
	}
	child(e) {
		this.els = this.els.querySelector(e);
		return this;
	}
	load(e, v){

	}
	css(v){
		this.els.style = v;
		let rs = this.els.style;
		this.els = this.reels;
		return this;
	}
}

/* =================================== VIEWS =================================== */

// move to Android.js or Ios.js

/* =================================== COMPONENTS =================================== */

class Text extends Component {
	constructor(name){
		super(name);
		this.id = this.getElement("#"+this.in+" "+name);
	}
	setText(text){
		typeof(text)!=="undefined" ? text = text : text = "";
		this.id.textContent = text;
	}
	getText(){
		typeof(text)!=="undefined" ? text = text : text = "";
		return this.id.textContent;
	}
}

class Input extends Component {
	constructor(name){
		super(name);
		this.id = this.getElement("#"+this.in+" "+name);
	}
	keyup(f){
		this.id.addEventListener("keyup", (e) => {
			e.stopImmediatePropagation();
			f(this.id.value);
		});
	}
	setValue(text){
		typeof(text)!=="undefined" ? text = text : text = "";
		this.id.value = text.toString();
	}
	getValue(){
		let _v = this.id.value.toString();
		this.id.setAttribute("value", _v);
		typeof(_v)!=="undefined" ? _v = _v : _v = "";
		return _v;
	}
}

class Button extends Component {
	constructor(name){
		super(name);
		this.id = this.getElement("#"+this.in+" "+name);
	}
	click(f){
		this.id.addEventListener("click", (e) => {
			e.stopImmediatePropagation();
			f(e);
		});
	}
}

/* =================================== MACHINE =================================== */

class Machine extends DOMManager {
	constructor(classAct, defineClass, r) {
		super();
		this.nodes = {};
		// this.node = [];
		// this.values = [];
		let id = "#"+defineClass.in;
		r==true?classAct.__render__():null;
		classAct.onCreate(defineClass);
		var el = this.getElement(id);
		this.declareNodes(el);
		// console.log("nodes");
		// console.log(this.nodes);
		// console.log("values");
		// console.log(this.values);
	}
	declareNodes(el){
		for (var i = 0; i < el.children.length; i++) {
			this.forNodes(el.children[i]);
		}
	}
	forNodes(el){
		if (typeof(el.attributes)!=="undefined") {
			let node = {};
			let is = false;
			for (var att, i = 0, atts = el.attributes, n = atts.length; i < n; i++) {
				att = atts[i];
				if (att.nodeName=="for") {
					is = true;
				}
				node[att.nodeName] = att.nodeValue;
				// this.node.push(att.nodeName);
				// this.values.push(att.nodeValue);
			}
			this.declareNodes(el);
			if (is) {
				this.log(el);
				this.log(node);
			}
		}
	}
}

class StateManagement extends DOMManager {
	constructor(n) {
		super();
		this.nv = n;
		this.refState();
	}
	refState() {
		this.state = this.__h__.state;
	}
	navigationReg(params) {
		this.state = {};
		// this.state==null?this.state={}:null;
		this.state[this.nv] = params;
		this.__h__.pushState(this.state, null, this.nv);
		this.refState();
	}
	navigationBack(s = false) {
		if (s==true) {
			this.__h__.back();
		}
		this.refState();
	}
	getState(key  = '') {
		if (typeof(this.state[this.nv])!=="undefined") {
			if (key!='') {
				if (typeof(this.state[this.nv][key])!=="undefined") {
					return this.state[this.nv][key];
				} else {
					return {};
				}
			} else {
				return this.state[this.nv];
			}
		} else {
			return {};
		}
	}
	// setState(params = {}) {
	// 	if (typeof(this.state[this.nv])!=="undefined") {
	// 		this.state[this.nv] = params;
	// 		this.__h__.pushState(this.state, this.nv, this.nv);
	// 		this.refState();
	// 	}
	// }
	getCaches() {
		typeof(is[this.nv])!=="undefined"?is[this.nv]:is[this.nv]={};
		return is[this.nv];
	}
}


/* =================================== BUILDER =================================== */

this.iv = [];
this.pageByName = {};
this.pageByNumber = {};
this.ic = 0;
this.is = {};
this.i = null;
this.cn = null;
this.in = null;
this.tracks = [];
this.tracksRecords = [];
this.lastn = null;

function __initPage__(c, i){
	this.cn = c.name;
	this.in = i;
	this.pageByName[i] = this.ic;
	this.pageByNumber[this.ic] = i;
	this.iv[this.ic] = {
		cn: this.cn,
		in: this.in,
		ct: c,
	}
	this.ic++;
}

function createPage(a){
	for (var i in a){
		this.__initPage__(a[i], i);
	}
}

function trackRegistry(n){
	let i = this.tracks.indexOf(n);
	if (i == -1){
		this.tracks.push(n);
	}
	this.tracksRecords.push(n);
}

function getUrlPage() {
	let arr_url = window.location.pathname.split('/');
	let n = arr_url[arr_url.length-1];
	return n;
}

this.r = true;

let pushState = history.pushState;
history.pushState = function(state) {
	pushState.apply(history, arguments);
}

window.onpopstate = function() {
	let n = getUrlPage();
	this.that.__nav__(n, (r) => {
		run(n, {}, r);
	});
}

function verStart(n) {
	let i = this.pageByName[n];
	this.definePage = this.iv[i];
	this.that = new this.definePage.ct({
		pageNumber: i,
		pageName: n,
		tracks: this.tracks,
		params: this.sm.getState(),
	}, this.sm.getCaches());
	new Machine(this.that, this.definePage, this.r);
}

function run(n, params, r = true){
	this.r = r;
	this.sm = new StateManagement(n);
	if (r==true) { // next
		this.sm.navigationReg(params);
	} else { // back
		this.sm.navigationBack();
	}
	verStart(n);
}

function navigate(_n, params = {}){
	let lastindex = this.tracks.indexOf(this.lastn);
	let index = this.tracks.indexOf(_n);
	if (lastindex>-1 && index>-1 && index<lastindex) { // priority back
		// let sel = lastindex-index;
		// for(let i = 0; i < sel; i++){
		// 	this.sm = new StateManagement(_n);
		// 	this.sm.navigationBack(true);
		// }
		history.go(index-lastindex);
	} else { // next, in page
		this.that.__nav__(_n, (r) => {
			run(_n, params, r);
		});
	}
	this.lastn = _n;
}

function trackRemove(f, t = 0){
	let n = this.pageByNumber[i];
	t = t==0?1:(t-f)+1;
	this.tracks.splice(f, t);
}

function start(){
	this.i==null?this.i=0:this.i;
	let n = this.pageByNumber[this.i];
	trackRegistry(n);
	this.run(n);
}