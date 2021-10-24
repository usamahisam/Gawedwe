/*
    Filename Object Proxy
    author: Ushama Mustikohisam
*/

import { handlerObject } from './objectproxy.js';
import { createWidget, handlerChange, Widget } from './widget.js';

export default class Component {
    constructor(props = {}) {
        var propsState = this.setStateProps(props);
        var vElem = this.main({ createWidget, Widget, propsState, state: handlerObject({}) });
        this.$vElem = vElem;
        this.$vElem.props = propsState;
        propsState.whenChange = (prop, value, action) => {
            vElem = this.main({ createWidget, Widget, propsState });
            this.$vElem.$el.replaceWith(vElem.$el);
            this.$vElem.$el = vElem.$el;
        }
        handlerChange(vElem);
    }

    setStateProps(props) {
        var propsState = props;
        if (typeof props === 'object' && !Array.isArray(props)) {
            propsState = handlerObject(props);
        }
        return propsState;
    }

    run(props = {}) {
        document.body.style.fontFamily = 'roboto, tahoma';
        document.body.style.margin = '0px';
        if (typeof props.animate !== 'undefined') {
            new props.animate(this.$vElem.$el.style);
        }
        document.getElementById("app").appendChild(this.$vElem.$el);
    }

}