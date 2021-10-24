function Main() {
	this.load = new Load();
}

Main.prototype = {
	constructor: Main,
	init: function(page_main) {
		this.get(page_main);
	},
	get: function(page_main) {
		var that = this;
		$.getScript('./app/main/'+page_main+'.js', (escript) => {
			console.log(escript);
			let home = new page_main();
			// that.load.screen(home.screen);
			// that.load.style(home.style);
		});
	}
}