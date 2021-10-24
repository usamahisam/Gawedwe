import { App } from './Core.js';
import Home from './src/home.js';
import Gambar from './src/gambar.js';
import Modal from './components/modal.js';

App.Activity({
	home: Home,
	gambar: Gambar,
});

App.Menu({
	modal: Modal
});

App.run();