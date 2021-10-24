import Element from './createElement.js';
import render from './render.js';
import mount from './mount.js';
import diff from './diff.js';

const createVApp = count => new Element('div', {
  attrs: {
    id: 'app',
    dataCount: count, // we use the count here
    style: {
      backgroundColor: 'red'
    }
  },
  children: [
    'The current count is: ',
    String(count), // and here
    ...Array.from({ length: count }, () => new Element('img', {
      attrs: {
        src: 'https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif',
      },
    })),
    new Element('div', {
      attrs: {
        id: 'isi',
      },
      children: [
        'Aplikasi App',
      ],
    }),
  ],
});

let vApp = createVApp(0);
console.log(vApp);
const $app = render(vApp);
let $rootEl = mount($app, document.getElementById('app'));

setInterval(() => {
  const n = Math.floor(Math.random() * 10);
  const vNewApp = createVApp(n);
  const patch = diff(vApp, vNewApp);

  // we might replace the whole $rootEl,
  // so we want the patch will return the new $rootEl
  $rootEl = patch($rootEl);

  vApp = vNewApp;
}, 1000);