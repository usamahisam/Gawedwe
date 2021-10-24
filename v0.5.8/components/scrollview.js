import { Component, Log } from '../Core.js';

class ScrollView extends Component {
	
	constructor(n) {
		super(n);
		this.NP = null;
	}

	view(nodeParent) {
		this.NP = nodeParent;
		return (`
		    <svg id="feedback-animation-canvas" width="100%" height="100%" opacity=".6">
		      <circle id="feedback-animation" class="hidden" cx="100" cy="-975" r="1000" fill="black" opacity="0"/>
		    </svg>
		    <div class="content-container">
		    	<div class="content-main">
		    	</div>
		    </div>
		`);
	}

	render(view) {
		view.style.position = 'relative';
		view.style.height = '100%';
		view.style.overflow = 'hidden';
		view.style.overflow = 'hidden';
		view.style.zIndex = '1';
		view.style.backgroundColor = '#fff';
		
		var elFAC = view.querySelector("#feedback-animation-canvas");
		elFAC.style.position = 'absolute';
		elFAC.style.zIndex = '1';
		elFAC.style.pointerEvents = 'none';

		this.cc = view.querySelector(".content-container");
		this.cc.style.width = '100%';
		this.cc.style.height = '100%';
		this.cc.style.overflow = 'auto';
		this.cc.style.scrollBehaviour = 'smooth';

		this.cm = view.querySelector(".content-main");
		this.cm.append(this.NP);
		this.cm.style.margin = '10px';

		this.scrollBarFun(view);
	}

	scrollBarFun(view) {
		var SUPPORTS_TOUCH = "ontouchstart" in window,
	    shell = view,
	    bounds = view.querySelector("#feedback-animation-canvas"),
	    dot = view.querySelector('#feedback-animation'),
	    scroller = view.querySelector('.content-container'),
	    dotSettings = { cxOrig: dot.getAttribute('cx'), 
	                    cyOrig: dot.getAttribute('cy'),
	                   	cyOrigMax: 0,
	                   	cyOffset: dot.getAttribute('r') - Math.abs(dot.getAttribute('cy')),
	                    r: dot.getAttribute('r'),
	                   	isAtMinBounds: true,
	                  	SCALER: -15,
	                   	X_INCREMENTER: 4,
	                  	Y_INCREMENTER: 3,
	                    ALPHA_INCREMENTER: .08,
	                    ALPHA_MULTIPLIER: .6,
	                  	CLEAR_TIME: 500,
	                    CLEAN_BOUNDS_INTERVAL: 25},
	    inputY = 0,
	    cleanBoundsTimeout,
	    cleanBoundsInterval;

		//setup (touch/non-touch)
		if(!SUPPORTS_TOUCH) { scroller.setAttribute('class', 'hideScrollBar'); }
		scroller.addEventListener(SUPPORTS_TOUCH ? "touchstart" : "mousedown", onDown);

		//methods
		function overscrollAnimation() {
		  cleanBoundsTimeout = setTimeout(function(){
		    dot.setAttribute('class', 'hidden');
		    clearInterval(cleanBoundsInterval);
		  }, dotSettings.CLEAR_TIME);
		  
		  cleanBoundsInterval = setInterval(function(){
		    var currX = dot.getAttribute('cx'),
		  			currY = dot.getAttribute('cy'),
		        newX, newY, newA;    
		    
		    //x
		    if(currX < dotSettings.cxOrig) { newX = parseFloat(currX) + dotSettings.X_INCREMENTER; }
		    else if(currX > dotSettings.cxOrig) { newX = parseFloat(currX) - dotSettings.X_INCREMENTER; }
		    
		    //y
		    if(currY < dotSettings.cyOrig) { newY = parseFloat(currY) - dotSettings.Y_INCREMENTER; }
		    else if(currY > dotSettings.cyOrig) { newY = parseFloat(currY) + dotSettings.Y_INCREMENTER; }
		    
		    //a
		    newA = parseFloat(dot.getAttribute('opacity')) - dotSettings.ALPHA_INCREMENTER;
		    
		    //update
		    updateDot(newX, newY, newA);
		  }, dotSettings.CLEAN_BOUNDS_INTERVAL);
		}

		function quickFlash(isAtMinBounds) {
		  var y = isAtMinBounds ? 
		      		parseFloat(dotSettings.cyOrig) + parseFloat(dotSettings.cyOffset) : 
		  				parseFloat(dotSettings.cyOrigMax) - parseFloat(dotSettings.cyOffset); 
		  dotSettings.isAtMinBounds = isAtMinBounds;
		  
		  dot.setAttribute('class', '');
		  updateDot(dotSettings.cxOrig, y, .5);
		  if(cleanBoundsTimeout) { clearTimeout(cleanBoundsTimeout); clearInterval(cleanBoundsInterval); } 
		  overscrollAnimation();
		}

		function updateDot(x, y, a) {
		  if(x) { dot.setAttribute('cx', x) };
		  if(y) { dot.setAttribute('cy', y) };
		  if(a) { dot.setAttribute('opacity', a) };
		}

		//handlers
		function onDown(e) {
		  e.stopImmediatePropagation();
		  
		  //top vs bottom bounds
		  if(scroller.scrollTop === 0) {
		    dotSettings.isAtMinBounds = true;
		    updateDot(dotSettings.cxOrig, dotSettings.cyOrig, 0);
		  } else if (scroller.scrollTop + scroller.clientHeight === scroller.scrollHeight) {
		    dotSettings.isAtMinBounds = false;
		    dotSettings.cyOrigMax = (dotSettings.cyOrig * -1) + scroller.clientHeight;
		  	updateDot(dotSettings.cxOrig, dotSettings.cyOrigMax, 0);
		  } else {
		    scroller.addEventListener("scroll", onScrolling);
		    return;
		  }

		  //prep updates
		  inputY = SUPPORTS_TOUCH ? e.touches[0].clientY : e.clientY;
		  window.addEventListener(SUPPORTS_TOUCH ? "touchend" : "mouseup", onUp);
		  scroller.addEventListener(SUPPORTS_TOUCH ? "touchmove" : "mousemove", onMove);
		  dot.setAttribute('class', '');
		  shell.setAttribute('class', 'cursor-dot-down');
		  if(cleanBoundsTimeout) { clearTimeout(cleanBoundsTimeout); clearInterval(cleanBoundsInterval); }
		}

		function onUp(e) {
        //   e.stopImmediatePropagation();			
		  window.removeEventListener(SUPPORTS_TOUCH ? "touchend" : "mouseup", onUp);
		  scroller.removeEventListener(SUPPORTS_TOUCH ? "touchmove" : "mousemove", onMove);
		  shell.setAttribute('class', 'cursor-dot');
		  if(cleanBoundsTimeout) { clearTimeout(cleanBoundsTimeout); clearInterval(cleanBoundsInterval); }
		  overscrollAnimation();
		}

		function onMove(e) {
			e.stopImmediatePropagation();
		  var newY,
		      newA,
		      clientX = SUPPORTS_TOUCH ? e.touches[0].clientX : e.clientX,
		  		clientY = SUPPORTS_TOUCH ? e.touches[0].clientY : e.clientY;
		  
		  //bounds top vs bottom
		  if(dotSettings.isAtMinBounds) {
		    if(clientY < inputY) { onUp(); return; }
		    newY = dotSettings.cyOrig - (clientY - scroller.offsetTop)/dotSettings.SCALER ;
		    newA = (clientY - scroller.offsetTop) / shell.clientHeight;
		  } else {
		    if(clientY > inputY) { onUp(); return; }
		    newY = dotSettings.cyOrigMax - dotSettings.cyOffset - (clientY - scroller.offsetTop)/dotSettings.SCALER;
		    newA = 1 - (clientY - scroller.offsetTop) / shell.clientHeight;
		  }
		  
		  //update
		  inputY = clientY;
		  updateDot((clientX - scroller.offsetLeft), newY, newA);
		}

		function onScrolling(e) {
		  e.stopImmediatePropagation();
		  if(scroller.scrollTop === 0) {
		    scroller.removeEventListener("scroll", onScrolling);
		    quickFlash(true);
		  } else if(scroller.scrollTop + scroller.clientHeight === scroller.scrollHeight) {  
		    scroller.removeEventListener("scroll", onScrolling);
		    dotSettings.cyOrigMax = (dotSettings.cyOrig * -1) + scroller.clientHeight;
		    quickFlash(false);
		  }
		}
		this.scroller = scroller;
	}

	append(h = '') {
		this.cm.append(h);
	}

	onScroll(r) {
		this.scroller.addEventListener("scroll", (e) => {
			// e.stopImmediatePropagation();
			e.stopPropagation();
			r(e);
		});
		this.scroller.addEventListener("touchmove", (e) => {
			// e.stopImmediatePropagation();
			r(e);
		});
	}
}

export default ScrollView;