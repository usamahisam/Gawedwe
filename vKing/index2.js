import { Component, Stylesheet, runApp, StatusBarColor } from './dinggo.js';
import Div from './lib/div.js';

class Layout extends Component {
	main() {
		return new Div((self) => {
			this.render = self.render;
			self.style(new Stylesheet({
                position: 'absolute',
                width: '100vw',
                height: '100vh',
                right: 0,
                left: 0,
                backgroundColor: '#fff',
                overflow: 'hidden',
            }));
		});
	}
	view(v) {
		this.render.appendChild(v);
    }
}

class BeautifulHeader extends Component {
	main() {
		return new Div((self) => {
            this.render = self.render;
            self.style(new Stylesheet({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '25vh',
                backgroundColor: '#2196f3',
                // borderRadius: '0px 0px 40px 40px',
                zIndex: 0,
            }));
            StatusBarColor('#2196f3'); // #e91e63
		});
	}
}

class Card extends Component {
	main() {
		return new Div((self) => {
            this.render = self.render;
            this.render.textContent = 'aksdhkad';
            self.style(new Stylesheet({
                position: 'absolute',
                top: '30px',
                transform: 'translate(7vw, 18vw)',
                padding: '10px',
                backgroundColor: '#fff',
                color: '#000',
                borderRadius: '10px',
                width: '80vw',
                height: '100px',
                boxShadow: '0px 0px 2px 0px #ccc',
            }));
		});
	}
}

class BottomTab extends Component {
	main() {
		return new Div((self) => {
            self.render;
            self.style(new Stylesheet({
                position: 'fixed',
                bottom: 0,
                width: 'calc(100vw + 24px)',
                left: '-12px',
                height: '60px',
                boxShadow: '3px 0px 3px 0px #ccc',
            }));
		});
	}
}

class MyHome extends Component {
	main() {
		return new Layout((self) => {
            self.view(new BeautifulHeader());
            self.view(new Card());
		});
	}
}

class MyHomeTab extends Component {
	main() {
		return new Layout((self) => {
            self.view(new MyHome());
            self.view(new BottomTab());
		});
	}
}

var t = runApp(new MyHomeTab());