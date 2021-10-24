import { Activity } from '../incode/Core.js';

class Home extends Activity {
	
	constructor() {
		super();
	}

	view() {
		return `
			<header>
				<h2>Aplikasi</h2>
				<div class="header">Home</div>
			</header>
			<content>
				<div>Isi Konten</div>
			</content>
			<header class="caliber"></header>
		`;
	}

	oncreate() {
		this.stylesheet('h2', css => {
			css.color = "yellow";
		});
		this.stylesheet('header.caliber', css => {
			css.backgroundColor = "red";
		});
		this.stylesheet('header.caliber .header', css => {
			css.color = "yellow";
		});
	}
}

export default Home;