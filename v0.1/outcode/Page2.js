class Page2 extends Component {
	
	constructor(main) {
		super(main);
	}

	view() {
		return `
			<div class="header">
				<div class="title">Halaman 2</div>
			</div>
			<div class="content">
				<h1 id="judul">Page 2</h1>
				<button onclick="that.toHome()"><< KEMBALI KE HOME</button>
				<button onclick="that.toPage()"><< PAGE 1</button>
				<button onclick="that.toPage3()">PAGE 3 >></button>
			</div>
		`;
	}

	onStart(init) {
		this.judul = new Text("judul");
		this.judul.setText("Selamat Datang di halaman Kedua");
	}

	toHome() {
		this.navigate('home');
	}

	toPage() {
		this.navigate('page');
	}

	toPage3() {
		this.navigate('page3');
	}

}