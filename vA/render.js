const renderElem = ({ tagName, attrs, children, stylesheet, action}) => {
  // create the element
  //   e.g. <div></div>
  const $el = document.createElement(tagName);

  // add all attributs as specified in vNode.attrs
  //   e.g. <div id="app"></div>
  for (const [k, v] of Object.entries(attrs)) {
    $el.setAttribute(k, v);
  }

  // append all children as specified in vNode.children
  //   e.g. <div id="app"><img></div>
  if (typeof(children) !== 'undefined') {
    for (const child of children) {
      $el.appendChild(render(child));
    }
  }

  // append all stylesheet as specified in vNode.stylesheet
  //   e.g. stylesheet
  if (typeof(stylesheet) !== 'undefined') {
    for (const [k, v] of Object.entries(stylesheet)) {
      $el.style[k] = v;
    }
  }

  // append all action as specified in vNode.action
  //   e.g. action addEventListener
  if (typeof(action) !== 'undefined') {
    for (const [k, v] of Object.entries(action)) {
      $el.addEventListener(k, v);
    }
  }

  return $el;
};

const render = (vNode) => {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode);
  }

  // we assume everything else to be a virtual element
  return renderElem(vNode);
};

export default render;