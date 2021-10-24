import { App } from './Core.js';
import Home from './src/home.js';
import Menu1 from './src/menu1.js';
import ModalMenu from './menus/modal.js';

App.Activity({
	home: Home,
	menu: Menu1,
});

App.Menu({
	modal: ModalMenu
});

App.run();