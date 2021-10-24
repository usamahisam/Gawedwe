import { App } from './Core.js';
import Home from './src/home.js';
import Gambar from './src/gambar.js';
import ModalMenu from './menus/modal.js';

App.Activity({
	home: Home,
	gambar: Gambar,
});

App.Menu({
	modal: ModalMenu
});

App.run();