import { Activity } from '../incode/Core.js';

class About extends Activity {
	
	constructor() {
		super();
	}

	view() {
		return `
			<header/>
			<content>
			</content>
		`;
	}

	stylesheet(element) {
	}
}

export default About;