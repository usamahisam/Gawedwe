/*
    Example Code
    Filename Object Proxy
    author: Ushama Mustikohisam
*/

import { Component } from '../lib/index.js';

export default class HeaderText extends Component {
    main({createWidget, propsState}) {
        return createWidget('div', ({children, stylesheet}) => {
            stylesheet.fontWeight = 'bold';
            stylesheet.fontSize = '23px';
            stylesheet.color = '#fff';
            stylesheet.padding = '13px 18px 13px 18px';
            children((add) => {
                add(propsState.text);
            });
        });
    }
}