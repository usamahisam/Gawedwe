class Android extends View {
	constructor(m){
		super(m);
	}
}

/*class Page extends Android {
	constructor(m){
		super(m);
		this.m = m;
		this.animateOpen = "slide-md-open";
		this.animateClose = "slide-md-close";
	}
	template(){
		let animate = this.animateOpen;
		if (tracks.length==1) {
			animate = "";
		}
		return `<page class="`+this.m.pageName+` `+animate+`" id="`+this.m.pageName+`">`+this.view()+`</page>`;
	}
	afterRender(){
		let e = this.getElement("#"+this.m.pageName);
		let st = setTimeout(() => {
			e.classList.remove(this.animateOpen);
			clearTimeout(st);
		}, 270);
	}
	onBack(n){
		let d = this.getElement("#"+n);
		d.className = d.className+" "+this.animateClose;
		let st = setTimeout(() => {
			this.deletePage(n);
			clearTimeout(st);
		}, 200);
	}
}*/

class Page extends Android {
	constructor(m){
		super(m);
		this.m = m;
	}
	template(){
		return '<page class="'+this.m.pageName+'" id="'+this.m.pageName+'">'+this.view()+'</page>';
	}
	cssTemplate(css){
		css('@', 'top:20px;');
		css('@', 'opacity:.0;');
	}
	afterRender(){
		let sty = new Style(this.m.pageName);
		let z = 20;
		let si = setInterval(() => {
			let op = z!=0?1-(z/20):1;
			sty.css('top:'+z+'px;');
			if (z==0) {
				clearInterval(si);
			}
			z--;
		}, 10);
	}
	onBack(n){
		let sty = new Style(n);
		let z = 0;
		let si = setInterval(() => {
			let op = z!=0?1-(z/20):1;
			sty.css('top:'+z+'px;opacity:'+op+';');
			if (z==20) {
				this.deletePage(n);
				clearInterval(si);
			}
			z++;
		}, 10);
	}
}