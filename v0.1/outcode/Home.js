class Home extends Component {
	
	constructor(main, state) {
		super(main);
		this.state = state;
		this.strNama = this.state["nama"];
	}

	view() {
		return `
			<div class="header">
				<div class="title">Bad Framework</div>
			</div>
			<div class="content">
				<div class="row">
					<div class="col s12 m6">
					  <div class="card blue-grey darken-1">
					    <div class="card-content white-text">
					      <span class="card-title">Card Title</span>
					      <p>I am a very simple card. I am good at containing small bits of information.
					      I am convenient because I require little markup to use effectively.</p>
					    </div>
					    <div class="card-action">
					      <a href="#">This is a link</a>
					      <a href="#">This is a link</a>
					    </div>
					  </div>
					</div>
				</div>
				  <div class="row">
				    <div class="col s12 m7">
				      <div class="card">
				        <div class="card-image">
				          <img src="images/sample-1.jpg">
				          <span class="card-title">Card Title</span>
				        </div>
				        <div class="card-content">
				          <p>I am a very simple card. I am good at containing small bits of information.
				          I am convenient because I require little markup to use effectively.</p>
				        </div>
				        <div class="card-action">
				          <a href="#">This is a link</a>
				        </div>
				      </div>
				    </div>
				  </div>  <ul class="collection">
    <li class="collection-item avatar">
      <img src="images/yuna.jpg" alt="" class="circle">
      <span class="title">Title</span>
      <p>First Line <br>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    </li>
    <li class="collection-item avatar">
      <i class="material-icons circle">folder</i>
      <span class="title">Title</span>
      <p>First Line <br>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    </li>
    <li class="collection-item avatar">
      <i class="material-icons circle green">insert_chart</i>
      <span class="title">Title</span>
      <p>First Line <br>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    </li>
    <li class="collection-item avatar">
      <i class="material-icons circle red">play_arrow</i>
      <span class="title">Title</span>
      <p>First Line <br>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    </li>
  </ul>
				<div>BAIK <span class="badge" id="nama"></span></div>
				<input type="text" id="input" class="input-field inline">
				<a class="waves-effect waves-light btn-large" id="btnNext">Ke Halaman Selanjutnya</a>
				<div>Aplikasi Ini Mulai dari mana Ya???? <span id="nama"></span></div>
			</div>
		`;
	}

	style(css) {
		css(".header", "background-color:blue;");
		css(".header", "color:#FFF;");
	}

	onStart(init) {
		this.input = new Input("input");
		this.nama = new Text("nama");
		this.btnNext = new Button("btnNext");
		this.input.setValue(this.strNama);
		this.nama.setText(this.strNama);
		this.getData();
		this.input.keyup((val) => {
			this.nama.setText(val);
			this.state["nama"] = val;
		});
		this.nama.click((e) => {
			alert('page');
		});
		this.btnNext.click((e) => {
			this.navigate('page');
		});
	}

	async getData() {
		await fetch({
			url: "https://api.banghasan.com/sholat/format/json/kota/kode/586",
			method: "POST"
		}, (val) => {
			this.nama.setText(val);
		});
	}

}