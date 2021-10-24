class Page3 extends Component {
	
	constructor(main) {
		super(main);
	}

	view() {
		return `
			<div class="header">
				<div class="title">Halaman 3</div>
			</div>
			<div class="content">
				<h1 id="judul">Page 3</h1>
				<h1>Page 3</h1>
				<h1>Page 3</h1>
				<h1>Page 3</h1>
				<h1>Page 3</h1>
				<button onclick="that.toHome()"><< KEMBALI KE HOME</button>
				<button onclick="that.toPage2()"><< PAGE 2</button>
			</div>
		`;
	}

	style(css) {
		css(".header", "background-color:yellow;color:#000;");
	}

	onStart(init) {
		this.judul = new Text("judul");
		this.judul.setText("Halaman Ketiga yaitu halaman terakhir");
	}

	toHome() {
		this.navigate('home');
	}

	toPage2() {
		this.navigate('page2');
	}

}