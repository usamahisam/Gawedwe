/*
    Filename Object Proxy
    author: Ushama Mustikohisam
*/

export function handlerObject(elemObj) {
    var objProx = new Proxy(elemObj, {
        set: (obj, props, value) => {
            var action = null;
            if (typeof(obj[props])==='undefined') {
                action = 'added';
            } else {
                if (obj[props] != value) {
                    action = 'changed';
                }
            }
            obj[props] = value;
            if (value == '') {
                delete obj[props];
                action = 'deleted'; 
            }
            if (action != null && props != 'whenChange') {
                excWhenChange(obj, props, value, action);
            }
            return true;
        },
        deleteProperty: (obj, prop) => {
            if (prop in obj) {
                delete obj[prop];
                excWhenChange(obj, prop, null, 'deleted');
            }
            return true;
        }
    });
    return objProx;
}

function excWhenChange(obj, prop, value, action) {
    if (typeof(obj['whenChange']) !== 'undefined') {
        obj['whenChange'](prop, value, action);
    }
}