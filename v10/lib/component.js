import DOMCycle from './domcycle.js';
import Log from './log.js';

export default class Component extends DOMCycle {
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
	widgetReady(p){
		// Log.w("`"+this.__cn+"` App onReady i required.");
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