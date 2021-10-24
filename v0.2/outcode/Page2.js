class Page2 extends Page {
	
	constructor(main) {
		super(main);
	}

	view() {
		return `
			<header>
				<title>Page 2</title>
			</header>
			<content>
				<h1>Ini Halaman Ke 3</h1>
				<button onclick="that.ke('home')">HOME</button>
				<button onclick="that.ke('page1')">PAGE 1</button>
			</content>
		`;
	}

	style(css) {
		css('header', 'background-color:yellow;');
		css('header title', 'color:#000;');
	}

	onCreate(init){
	}

	ke(h) {
		navigate(h);
	}
}