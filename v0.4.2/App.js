import { App, View, Log } from './Core.js';
import MainActivity from './src/mainactivity.js';
import Header from './components/header.js';
import Page from './components/page.js';

let app = new App();
app.registryActivity(
	MainActivity,
);

// let v = new View();

// function seth() {
// 	v.create('main').style('padding', '0px');
// 	v.create('header').style('backgroundColor', 'red').style('color', 'blue').text('aplikasi');
// 	v.create('h1').style('color', '#fff').text('title');
// 	v.create('span').style('color', '#fff').text('icon');
// 	v.inset();
// 	console.log(v.htmlComponent);
// 	v.display('body');
// 	console.log('after : '+v.htmlComponent);
// }

// let i = 0;
// function loop() {
// 	i++;
// 	if (i <= 10) {
// 		seth();
// 		setTimeout(() => {
// 			loop();
// 		}, 1000);
// 	}
// }
// loop();

// let html = `
// 	<header>
// 		<span>APlikasi</span>
// 	</header>
// 	<div class="content">
// 		<span>ABC</span>
// 		<h1>Aplikasi</h1>
// 	</div>
// `;
// v.setHtmlTag('page', css => {
// 	css.position = 'absolute';
// 	css.top = '0px';
// 	css.left = '0px';
// 	css.bottom = '0px';
// 	css.right = '0px';
// 	css.width = '100%';
// });
// v.setHtmlString(html);
// v.setHtmlStyle('header', css => {
// 	css.backgroundColor = 'red';
// 	css.paddingTop = '10px';
// 	css.paddingLeft = '10px';
// 	css.paddingBottom = '10px';
// });
// v.setHtmlStyle('header span', css => {
// 	css.color = '#fff';
// });
// setTimeout(() => {
// 	v.setHtmlStyle('header span', css => {
// 		css.color = 'yellow';
// 	});
// }, 5000);
// v.setHtmlText('class:content span', 'Konten Jo');
// v.setHtmlText('class:content h1', 'Konten Jo');
// v.setHtmlAppendString('class:content span', '<h3>disana senang</h3>');
// v.setHtmlAppendString('class:content span', '<h3>disana senang 1</h3>');
// v.setHtmlAppendString('class:content span', '<h3>disana senang 2</h3>');
// v.setHtmlAppendString('class:content span', '<h3>disana senang 3</h3>');
// v.setHtmlAppendString('class:content span', '<h3>disana senang 4</h3>');
// v.setHtmlAppendString('class:content span', '<h3>disana senang 5</h3>');
// v.setHtmlAppendString('class:content span', '<h3>disana senang 6</h3>');
// v.display('body');