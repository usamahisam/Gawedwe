class Page1 extends Component {
	
	constructor(main, state) {
		super(main);
		this.state = state;
		this.nama = this.state["nama"];
	}

	view() {
		return `
			<div class="header">
				<div class="title">Halaman 1</div>
			</div>
			<div class="content">
				<h1 id="judul">Page 1</h1>
				<a class="waves-effect waves-light btn" id="btn-kembali"><< KEMBALI KE HOME</a>
				<a class="waves-effect waves-light btn" id="btn-page">PAGE 2</a><br>
			</div>
		`;
	}

	onStart(init) {
		this.judul = new Text("judul");
		this.btnKembali = new Button("btn-kembali");
		this.btnPage = new Button("btn-page");
		this.judul.setText(this.nama);
		this.btnKembali.click((e) => {
			this.navigate('home');
		});
		this.btnPage.click((e) => {
			this.navigate('page2');
		});
	}

	style(css) {
		css(".header", "background-color:red;")
	}

}