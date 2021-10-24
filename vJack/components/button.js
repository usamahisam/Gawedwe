import Component from "../lib/component2.js";
import createElement from "../lib/createElement.js";

export default class Button extends Component {
  render({click}) {
    return new createElement('button', {
      attrs: {
        id: 'btn'
      },
      children: [
        'Button Click'
      ],
      action: {
        click: click
      }
    });
  }
}