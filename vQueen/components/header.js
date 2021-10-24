/*
    Example Code
    Filename Object Proxy
    author: Ushama Mustikohisam
*/

import { Component } from '../lib/index.js';
import HeaderText from './headertext.js';

export default class Header extends Component {
    main({createWidget, Widget, propsState}) {
        return createWidget('div', ({children, stylesheet}) => {
            stylesheet.position = 'absolute';
            stylesheet.top = '0';
            stylesheet.left = '0';
            stylesheet.width = '100vw';
            stylesheet.height = '53px';
            stylesheet.backgroundColor = propsState.bgColor || '#2196f3';
            stylesheet.boxShadow = '0px 3px 4px 0px #ccc';
            children((add) => {
                add(Widget(HeaderText, {
                    text: propsState.text
                }));
            });
        });
    }
}