import createElement from './createElement.js';
import render from './render.js';
import mount from './mount.js';
import diff from './diff.js';

class DinggoComponent {
  constructor(c, state) {
    var m = this.main(state, c);
    return m;
  }
  main(state, c) {
  }
}

class Button extends DinggoComponent {
    main(state, {text}) {
      return new createElement('button', {
        attrs: {
          id: 'btn'
        },
        children: [
          text
        ],
        stylesheet: {
          backgroundColor: 'red'
        },
        action: {
          click: () => {
            alert('A : '+state);
          }
        }
      });
    }
}

class Home extends DinggoComponent {
  main(c) {
    return new createElement('div', {
      attrs: {
        id: 'div'
      },
      children: [
        new Button({
          text: 'Klik Cok'
        }),
      ]
    });
  }
}


let vApp = new Home();
const $app = render(vApp);
let $rootEl = mount($app, document.getElementById('app'));

// let no = 0;
// setInterval(() => {
//   const vNewApp = new Home(no);
//   const patch = diff(vApp, vNewApp);
//   $rootEl = patch($rootEl);
//   vApp = vNewApp;
//   no++;
// }, 1000);