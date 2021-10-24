import Component from "../lib/component2.js";
import createElement from "../lib/createElement.js";
import store from "../store/index.js";
import Button from "./button.js";

export default class Coba extends Component {
  constructor() {
    super({store});
  }

  render() {
    return new createElement('div', {
      attrs: {
        id: 'div'
      },
      children: [
        new createElement('div', {
          attrs: {
            id: 'abc'
          },
          children: store.state.items.map(item => {
            return item;
          })
        }),
        new Button({
          click: () => {
            store.dispatch('addItem', 'Jancok');
            alert('Jancok');
          }
        })
      ]
    });
  }
}