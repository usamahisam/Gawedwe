function Load() {
	this.data = {};
	this.i = 0;
}

Load.prototype = {
	constructor: Load,
	generateScreen: function(screen_name, val) {
		return '<div class="'+screen_name+'">'+val+'</div>';
	},
	safe: function(val) {
		return val.split('/').join('-')
	},
	get: function(url, onsuccess, onerror) {
		$.ajax({
			url: url,
			success: function(response) {
				onsuccess(response);
			},
			error: function(xhr, co, throwError) {
				onerror(xhr.status+">"+throwError);
			}
		});
	},
	screen: function(screen_url) {
		let su1 = screen_url, su2 = this.safe(screen_url);
		let that = this;
		this.get('./app/screen/'+su1+'.html', response => {
			let screenView = that.generateScreen(su2, response);
			$("app-root").append(screenView);
			that.data[su2] = {
				view: screenView,
			};
			that.i++;
			console.log(that.data);
		}, error => {
			console.log(su2+" Not Found!", error);
		});
	},
	style: function(css_url) {
		let cu1 = css_url, cu2 = this.safe(css_url);
		let that = this;
		this.get('./app/style/'+cu1+'.css', response => {
		}, error => {
			console.log(cu2+" Not Found!", error);
		});
	}
}