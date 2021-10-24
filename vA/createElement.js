export default class createElement {
  constructor(tagName, { attrs, children, stylesheet, action }) {
    const vElem = Object.create(null);
  
    var po = {
      tagName,
    };
    typeof(attrs) !== 'undefined' ? po['attrs'] = attrs : '';
    typeof(children) !== 'undefined' ? po['children'] = children : '';
    typeof(stylesheet) !== 'undefined' ? po['stylesheet'] = stylesheet : '';
    typeof(action) !== 'undefined' ? po['action'] = action : '';
    Object.assign(vElem, po);
  
    return vElem;
  }
}