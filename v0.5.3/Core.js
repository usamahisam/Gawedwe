export class Component {
	constructor(par = {}){
		this.__ex();
	}
	view(){
		Log.w("Component `"+this.constructor.name+"` View is not found");
	}
	render(){
		Log.w("Component `"+this.constructor.name+"` Render is not found");
	}
	regComponents(){
		return {};
	}
	__createDocument(v){
		let n = document.createElement("X"+this.constructor.name);
		n.innerHTML = v;
		return n;
	}
	__ex(){
		let r = this.__createDocument(this.view());
		Log.i(r);
	}
}


class LogManager {
	constructor(){
	}
	i(_i){
		console.log(_i);
	}
	w(i){
		console.warn(i);
	}
	e(i){
		console.error(i);	
	}
}

export var Log = new LogManager();


class GaweApp {
	constructor(){
		this.listActivities = {};
		this.defaultActivity = null;
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
	run(){
		let l = new this.listActivities[this.defaultActivity]();
	}
}

export var App = new GaweApp();