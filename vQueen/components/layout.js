/*
    Example Code
    Filename Object Proxy
    author: Ushama Mustikohisam
*/

import { Component } from '../lib/index.js';

export default class Layout extends Component {
    main({createWidget, propsState}) {
        return createWidget('div', ({children, stylesheet}) => {
            stylesheet.position = 'absolute';
            stylesheet.width = '100vw';
            stylesheet.height = '100vh';
            stylesheet.backgroundColor = '#fff';
            children((add) => {
                add(propsState.header);
            });
            children((add) => {
                add(propsState.body);
            });
        });
    }
}