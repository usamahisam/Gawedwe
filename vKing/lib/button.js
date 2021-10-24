import { Component, Stylesheet } from '../dinggo.js';

export default class Button extends Component {
	main({createWidget}) {
		return createWidget('button', ({self, style}) => {
			this.render = self;
			this.style = style;
            style(this.css1 = new Stylesheet({
                position: 'absolute',
                right: '20px',
                bottom: '20px',
                backgroundColor: '#1085f3',
                fontSize: '25px',
                padding: '9.5px 17px 17px 17px',
                border: '0px solid #fff',
                fontWeight: '450',
                borderRadius: '50%',
                height: '57px',
                width: '57px',
                outline: 'none',
                color: '#fff',
                boxShadow: '0px 4px 4px 0px #aaa',
                border: '5px solid #1085f3',
                transition: 'transform .2s ease-in-out',
            }));
        });
    }
    set text(a) {
        this.render.textContent = a;
    }
    set left(a) {
        this.css1.sheet.left = Math.round(a)+'px';
    }
    click(v) {
        this.render.addEventListener('click', v, false);
    }
}