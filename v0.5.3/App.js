import { App } from './Core.js';
import MainActivity from './src/mainactivity.js';

App.registryActivity({
	MainActivity,
});

App.run();