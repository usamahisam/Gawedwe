import DOMCycle from './domcycle.js';
import Log from './log.js';

class MOCKHV extends DOMCycle {
	constructor(){
		super();
		Log.i('-- Starting...');
		this._listSpeedMeasure = [];
		this._totalSpeedMeasure = 0;
		this._avgSpeedMeasure = 0;
		this._minSpeedMeasure = 0;
		this._maxSpeedMeasure = 0;
		this.__TIMECHECKMEASURE__ = 0;
		this.CHECKMEASURE(10);
	}

	get PERF() {
		return this.__self__.window.performance || this.__self__.window.mozPerformance || this.__self__.window.msPerformance || this.__self__.window.webkitPerformance || {};
	}

	get MEMORY() {
		return this.PERF.memory;
	}

	get INFO_PERF() {
		for (var value in this.PERF) {
			Log.i(value);
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

	async CHECKMEASURE(t) {
		this.__TIMECHECKMEASURE__++;
		var c = this.CPUCLOCK;
		this._listSpeedMeasure.push(c);
		this._totalSpeedMeasure += c;
		if (this.__TIMECHECKMEASURE__ < t) {
			await this.CHECKMEASURE(t);
		} else {
			this.__TIMECHECKMEASURE__ = 0;
			this._minSpeedMeasure = Math.min(...this._listSpeedMeasure);
			this._maxSpeedMeasure = Math.max(...this._listSpeedMeasure);
			this._avgSpeedMeasure = Math.round(this._totalSpeedMeasure/t);
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

	ISREADY(r) {
		var c = this.CPUCLOCK;
		Log.i('clock pass : '+c);
		if (c >= this._avgSpeedMeasure) {
			r();
		} else {
			this.ISREADY(r);
		}
	}
}

export default new MOCKHV();