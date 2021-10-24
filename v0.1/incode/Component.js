class Component {
	
	constructor(main, state) {
		this.main = main;
		this.state = state;
	}

	view() {
		return "<h1>Kosong Bro</h1>";
	}

	style(css) {
		css("body", "margin:0px;padding:0px;");
	}

	onStart(init) {
		console.log(init.in+" Not Defined onStart");
	}

	async navigate(page) {
		const prev = this.main.pageNumber;
		const curr = this.main.pageByName[page];
		let mode = "md";
		APP_MODE=="android"?mode="md":null;
		APP_MODE=="ios"?mode="ios":null;
		if (prev > curr) {
			animationOpenPage(page, "prev", "slide-stack", "slide-"+mode+"-close");
		} else {
			animationOpenPage(page, "next", "slide-"+mode+"-open", "");
		}
	}
}