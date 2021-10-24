import { Component, Stylesheet, runApp, StatusBarColor } from './dinggo.js';
import Div from './lib/div.js';
import Button from './lib/button.js';

class Layout extends Component {
	main() {
		return new Div((self) => {
			this.render = self.render;
			self.style(this.css1 = new Stylesheet({
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
	set right(x) {
		this.css1.sheet.right = x+'px';
	}
	set left(x) {
		this.css1.sheet.left = x+'px';
	}
}

class Header extends Component {
	main() {
		return new Div((self) => {
			self.render.appendChild(new Div((self) => {
				self.style(new Stylesheet({
					position: 'absolute',
					top: 0,
					left: '-12px',
					width: 'calc(100vw + 24px)',
					height: '63px',
					position: 'absolute',
					boxShadow: '0px 0px 4px 3px #ccc',
					zIndex: 2,
				}));
			}));
			self.render.appendChild(new Div((self) => {
				self.style(new Stylesheet({
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: '63px',
					position: 'absolute',
					zIndex: 2,
				}));
				this.styleHeader = self.style;
				StatusBarColor("#fff");
				self.render.appendChild(new Div((self) => {
					this.selfText = self.render;
					self.style(new Stylesheet({
						fontSize: '1.5em',
						fontWeight: '450',
						marginTop: '16px',
						marginLeft: '16px',
					}));
				}));
			}));
		});
	}
	set background(color) {
		StatusBarColor(color);
		this.styleHeader(new Stylesheet({
			backgroundColor: color, // #1085f3, #e91e63
		}));
	}
	set textColor(color) {
		this.styleHeader(new Stylesheet({
			color: color,
		}));
	}
	set text(v) {
		this.selfText.textContent = v;
	}
}

class Body extends Component {
	main() {
		return new Div((self) => {
			this.render = self.render;
			self.style(new Stylesheet({
				position: 'absolute',
				top: '63px',
				bottom: '0px',
				left: '0px',
				right: '0px',
				overflow: 'hidden',
				padding: '16px',
			}));
		});
	}
	content(v) {
		this.render.append(v);
	}
	touchover(callback) {
		this.render.addEventListener('touchmove', (e) => {
			var clientX = e.touches[0].clientX;
			callback({clientX});
		});
	}
}

class MyHome extends Component {
	main() {
		return new Layout((self) => {
			this.layout = self;
			self.view(new Header((self) => {
				self.text = 'Welcome to Dinggo :)!';
				self.background = '#1085f3';
				self.textColor = '#fff';
			}));
			self.view(new Body((self) => {
				self.content(new Div((self) => {
					this.span = self.render;
					self.render.textContent = 'Hello World.';
					self.style(new Stylesheet({
						fontSize: '20px',
						fontWeight: '450',
					}));
				}));
				self.content(new Div((self) => {
					this.span2 = self.render;
					self.render.textContent = 'Touch X Y : ';
				}));
				self.content(new Div((self) => {
					self.style(new Stylesheet({
						padding: '5px'
					}));
				}));
				self.content(new Div((self) => {
					self.render.textContent = 'KOPETNEWS';
					self.style(new Stylesheet({
						fontSize: '20px',
						fontWeight: '450',
					}));
				}));
				self.content(new Button((self) => {
					this.button = self;
					this._count = 0;
					self.text = '+';
					self.click(() => {
						this._count++;
						this.span.textContent = 'Hello Mars '+this._count;
						// runApp(new MyHome2());
					});
				}));
				self.touchover(({clientX}) => {
					this.span2.textContent = 'Touch X Y : '+clientX;
				});
			}));
		});
	}
}

class MyHome2 extends Component {
	main() {
		return new Layout((self) => {
			this.layout = self;
			self.view(new Header((self) => {
				self.text = 'Holaaa :)!';
				self.background = '#e91e63'; // #1085f3, #e91e63
				self.textColor = '#fff';
			}));
			self.view(new Body((self) => {
			}));
		});
	}
}

var t = runApp(new MyHome());
console.log(t);
