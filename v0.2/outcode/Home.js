class Home extends Page {
	
	constructor(main, state) {
		super(main);
		this.state = state;
	}

	view() {
		return `
			<header>
				<title>Bad Framework</title>
			</header>
			<content>
				<h1>Selamat Datang di Framework Ngasal</h1>
				<h3 id="text"></h3>
				<input type="text" id="input">
				<button id="btn1">PAGE 1</button>
				<button id="btn2">PAGE 2</button>
				<button id="btn3">KE INI</button>
				<button id="btn4">BUTTON</button>
				<div for="let i of that.d">
					<div>ABC</div>
					<div for="let i of that.d">
						<div>ABC</div>
					</div>
				</div>
			</content>
		`;
	}

	style(css) {
		css('header', 'background-color:red;');
		css('header title', 'color:#fff;');
	}

	onCreate(init){
		this.text = new Text("#text");
		this.input = new Input("#input");
		this.btn1 = new Button("#btn1");
		this.btn2 = new Button("#btn2");
		this.btn3 = new Button("#btn3");
		this.btn4 = new Button("#btn4");
		this.text.setText(this.state['input']);
		this.input.setValue(this.state['input']);
		this.input.keyup((val) => {
			this.state['input'] = val;
			this.input.setValue(val);
			this.text.setText(val);
		});
		this.btn1.click(() => {
			navigate('page1', {data: 'a'});
		});
		this.btn2.click(() => {
			navigate('page2');
		});
		this.btn3.click(() => {
			navigate('home');
		});
		this.btn4.click(() => {
		});
	}
}