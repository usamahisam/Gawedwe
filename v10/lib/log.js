import DOMCycle from './DOMCycle.js';

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

export default new LogManager();