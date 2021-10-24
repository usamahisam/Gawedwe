import { App } from './Core.js';
import MainActivity from './src/mainactivity.js';
import TabsActivity from './src/tabsactivity.js';
import HomeActivity from './src/homeactivity.js';

App.registryActivity({
	main: MainActivity,
	home: HomeActivity,
	tabs: TabsActivity,
});

App.run();