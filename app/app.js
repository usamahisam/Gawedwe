function App() {
	this.main = new Main();
}

App.prototype = {
	constructor: App,
	default: 'home',
	registry: function() {
		this.main.init('home');
	},
}