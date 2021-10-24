import { Component, Log } from '../Core.js';
import ScrollView from '../components/scrollview.js';

class Modal extends Component {
	
	constructor(n) {
        super(n);
        this.isOpen = false;
	}

	regComponents() {
		return ({
			ScrollView
		});
	}

	view(nodeParent) {
        return (`
            <div class="modal-panel">
                <div class="modal-header">123</div>
                <div class="modal-content">
                    <ScrollView id="sc2">
                        Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten Ini adalah isi konten 
                    </ScrollView>
                </div>
            </div>
		`);
	}

	render(view) {
		let s = view.style;
        s.position = 'fixed';
        s.left = 0;
        s.right = 0;
        s.bottom = 0;
        
        this.pnl = view.querySelector(".modal-panel");
        this.pnl.style.backgroundColor = '#fff';
        this.pnl.style.borderRadius = '40px 40px 0px 0px';
        this.pnl.style.boxShadow = '0px -5px 15px 0px #cacaca';
		this.pnl.style.width = '100vw';
        this.pnl.style.height = '0px';
        this.pnl.style.zIndex = '5';
        this.pnl.style.overflow = 'hidden';
        this.pnl.style.scrollBehavior = 'smooth';
        // this.pnl.style.transition = 'all .04s ease-in-out';
		view.addEventListener("mouseover", (e) => {
			Log.i(e.target.x);
            this.pnl.style.height = (200+e.target.x)+'px';
		});
        
        let head = view.querySelector(".modal-header");
        head.style.paddingTop = '25px';
        head.style.paddingLeft = '27px';
        head.style.paddingRight = '27px';
        head.style.fontSize = '20px';
        head.style.fontWeight = 'bold';
        
        let cnt = view.querySelector(".modal-content");
        cnt.style.paddingTop = '5px';
        cnt.style.paddingLeft = '27px';
        cnt.style.paddingRight = '27px';
        cnt.style.fontSize = '14px';
        cnt.style.display = 'flex';
        cnt.style.color = '#565656';
        cnt.style.overflow = 'hidden';
    }
    
    toggle(){
        setTimeout(() => {
            if (!this.isOpen) {
                // this.pnl.style.height = '200px';
                this.grundTo(0, 200, 1);
                this.isOpen = true;
            } else {
                // this.pnl.style.height = '0px';
                this.grundTo(200, 0, -1);
                this.isOpen = false;
            }
        }, 150);
    }

    grundTo(from, to, f){
        if ((f>0 && from<=to) || (f<0 && from>=to)) {
            setTimeout(() => {
                if (f > 0) {
                    from+=f;
                } else {
                    from-=f;
                }
                this.grundTo(from, to, f);
                this.pnl.style.height = (from)+'px';
            }, 1);
        }
    }
}

export default Modal;