/*
    Example Code
    Filename Object Proxy
    author: Ushama Mustikohisam
*/

import { Component } from '../lib/index.js';
import Layout from '../components/layout.js';
import Header from '../components/header.js';
import Button from '../components/button.js';

export default class Main extends Component {
    main({ Widget }) {
        this._count = 0;
        return Widget(Layout, {
            header: this.header = Widget(Header, { 
                text: 'Aplikasi : '+this._count
            }),
            body: Widget(Button, {
                text: 'Apaan tu '+(this._count),
                click: (props) => {
                    this._count++;
                    this.header.props.text = 'Klik : '+(this._count);
                    props.text = 'Klik terus : '+(this._count);
                    new Main2().run();
                }
            })
        });
    }
}

class Main2 extends Component {
    main({ Widget }) {
        return Widget(Layout, {
            header: this.header = Widget(Header, { 
                text: 'Jan'
            })
        });
    }
}