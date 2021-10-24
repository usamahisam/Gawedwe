import { App } from './Core.js';
import Home from './src/home.js';
import Halaman2 from './src/halaman2.js';

App.Activity({
	home: Home,
	halaman2: Halaman2,
});

App.animateOpen((s) => {
	s.top = '50vh';
	s.opacity = '0.0';
	setTimeout(() => {
		s.top = '0';
		s.opacity = '1.0';
	}, 150);
}, 200);

App.animateClose((s) => {
	setTimeout(() => {
		s.top = '49vh';
		s.opacity = '0.0';
	}, 150);
}, 400);

App.run();