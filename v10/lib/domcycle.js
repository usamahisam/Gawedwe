export default class DOMCycle {
	constructor(){
		this.__self__ = self;
		this.__dom__ = this.__self__.document;
		this.__cnsl__ = this.__self__.console;
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