/*
    Example Code
    Filename Object Proxy
    author: Ushama Mustikohisam
*/

import { Component } from '../lib/index.js';

export default class Button extends Component {
    main({createWidget, propsState}) {
        return createWidget('button', ({children, action, stylesheet}) => {
            stylesheet.marginTop = '100px';
            stylesheet.padding = '10px 20px 10px 20px';
            stylesheet.backgroundColor = '#2196f3';
            stylesheet.border = 'none';
            stylesheet.color = '#fff';
            stylesheet.fontSize = '15px';
            stylesheet.borderRadius = '5px';
            action.click = (ev) => {
                propsState.click(propsState, ev);
            };
            children((add) => {
                add(propsState.text);
            });
        });
    }
}