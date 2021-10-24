import { Component, Log, App } from '../Core.js';
import BlankPage from '../components/blankpage.js';
import Backboard from '../components/backboard.js';
import Modal from '../components/modal.js';

class ModalMenu extends Component {
	
	constructor(n) {
		super(n);
	}

	regComponents() {
		return ({
			BlankPage, Modal, Backboard
		});
	}

	view() {
		return (`
			<BlankPage id="fp">
                <Backboard id="bb1"></Backboard>
				<Modal id="mdl1" headerTitle="JANCOOKKK!!!!!"></Modal>
			</BlankPage>
		`);
	}

	render(view) {
		var b = view.bundle;
		this.bp1 = b.BlankPage.ID.fp;
		this.bb1 = b.Backboard.ID.bb1;
        this.mdl1 = b.Modal.ID.mdl1;
        
        this.bp1._view.style.transition = 'all .3s ease-in-out';
        this.bb1.open();
        this.mdl1.open();
        
        this.bb1.click(() => {
            this.mdl1.close();
			this.bb1.close();
            setTimeout(() => {
				this.bb1.destroy();
                App.Exit();
            }, 400);
        });
	}

}

export default ModalMenu;