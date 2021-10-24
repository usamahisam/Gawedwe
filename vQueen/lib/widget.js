/*
    Filename Object Proxy
    author: Ushama Mustikohisam
*/

import { handlerObject } from './objectproxy.js';


export function createWidget(tagName, callback) {
    const $el = document.createElement(tagName);
    var attrs = {}, children = [], stylesheet = $el.style, action = {};
    const vElem = Object.create(null);
    var el = {
        tagName,
        attrs,
        children,
        stylesheet,
        action,
    };
    Object.assign(vElem, el);
    vElem.attrs = handlerObject(attrs);
    vElem.action = handlerObject(action);
    function children_handler(add) {
        add((vNode) => {
            vElem.children.push(vNode);
            if (typeof vNode === 'string') {
                $el.appendChild(document.createTextNode(vNode));
            } else if (typeof vNode === 'object') {
                if (typeof vNode.tagName !== 'undefined') {
                    $el.appendChild(vNode.$el);
                }
            }
        });
    };
    callback({ attrs: vElem.attrs, children: children_handler, stylesheet: vElem.stylesheet, action: vElem.action });
    for (var item in vElem.attrs) {
        $el.setAttribute(item, vElem.attrs[item]);
    }
    for (var item in vElem.action) {
        $el.addEventListener(item, vElem.action[item]);
    }
    vElem.$el = $el;
    return vElem;
}

export function handlerChange(vElem) {
    if (typeof vElem !=='undefined') {
        if (typeof vElem.attrs !=='undefined') {
            vElem.attrs.whenChange = (prop, value, action) => {
                if (action == 'added' || action == 'changed') {
                    vElem.$el.setAttribute(prop, value);
                } else if (action == 'deleted') {
                    vElem.$el.removeAttribute(prop);
                }
            }
        }
        if (typeof vElem.action !=='undefined') {
            vElem.action.whenChange = (prop, value, action) => {
                if (action == 'added' || action == 'changed') {
                    vElem.$el.addEventListener(prop, value);
                } else if (action == 'deleted') {
                    vElem.$el.removeEventListener(prop);
                }
            }
        }
    }
}

export function Widget(objectName, props = {}) {
    var obj = new objectName(props);
    var objDetail = obj.$vElem;
    return objDetail;
}