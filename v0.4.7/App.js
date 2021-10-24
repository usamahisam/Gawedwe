import { App } from './Core.js';
import MainActivity from './src/mainactivity.js';
import Header from './components/header.js';
import Page from './components/page.js';

App.registryActivity({
	MainActivity,
});
App.running();