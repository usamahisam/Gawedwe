import render from './render.js';

const zip = (xs, ys) => {
  const zipped = [];
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
};

const diffAttrs = (oldAttrs, newAttrs) => {
  const patches = [];

  // setting newAttrs
  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push($node => {
      $node.setAttribute(k, v);
      return $node;
    });
  }

  // removing attrs
  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      patches.push($node => {
        $node.removeAttribute(k);
        return $node;
      });
    }
  }

  return $node => {
    for (const patch of patches) {
      patch($node);
    }
    return $node;
  };
};

const diffChildren = (oldVChildren, newVChildren) => {
  const childPatches = [];
  if (typeof(oldVChildren) !== 'undefined') {
    oldVChildren.forEach((oldVChild, i) => {
      childPatches.push(diff(oldVChild, newVChildren[i]));
    });
  }

  const additionalPatches = [];
  if (typeof(newVChildren) !== 'undefined') {
    for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
        additionalPatches.push($node => {
            $node.appendChild(render(additionalVChild));
            return $node;
        });
    }
  }

  return $parent => {
    // since childPatches are expecting the $child, not $parent,
    // we cannot just loop through them and call patch($parent)
    for (const [patch, $child] of zip(childPatches, $parent.childNodes)) {
      patch($child);
    }

    for (const patch of additionalPatches) {
      patch($parent);
    }
    return $parent;
  };
};

const diffStylesheet = (oldStylesheet, newStylesheet) => {
  const patches = [];

  // setting newStylesheet
  for (const [k, v] of Object.entries(newStylesheet)) {
    patches.push($node => {
      $node.style[k] = v;
      return $node;
    });
  }

  // removing Stylesheet
  for (const k in oldStylesheet) {
    if (!(k in newStylesheet)) {
      patches.push($node => {
        $node.style[k] = 'none';
        delete $node.style[k];
        return $node;
      });
    }
  }

  return $node => {
    for (const patch of patches) {
      patch($node);
    }
    return $node;
  };
};

const diffAction = (oldAction, newAction) => {
  const patches = [];

  // setting newAction
  for (const [k, v] of Object.entries(newAction)) {
    patches.push($node => {
      $node.addEventListener(k, v);
      return $node;
    });
  }

  // removing Action
  for (const k in oldAction) {
    if (!(k in newAction)) {
      patches.push($node => {
        $node.removeEventListener(k);
        return $node;
      });
    }
  }

  return $node => {
    for (const patch of patches) {
      patch($node);
    }
    return $node;
  };
};

////////////////////

const diff = (oldVTree, newVTree) => {
  // let's assume oldVTree is not undefined!
  if (newVTree === undefined) {
    return $node => {
      $node.remove();
      // the patch should return the new root node.
      // since there is none in this case,
      // we will just return undefined.
      return undefined;
    }
  }

  if (typeof oldVTree === 'string' ||
    typeof newVTree === 'string') {
    if (oldVTree !== newVTree) {
      // could be 2 cases:
      // 1. both trees are string and they have different values
      // 2. one of the trees is text node and
      //    the other one is elem node
      // Either case, we will just render(newVTree)!
      return $node => {
         const $newNode = render(newVTree);
         $node.replaceWith($newNode);
         return $newNode;
       };
    } else {
      // this means that both trees are string
      // and they have the same values
      return $node => $node;
    }
  }

  if (oldVTree.tagName !== newVTree.tagName) {
    // we assume that they are totally different and 
    // will not attempt to find the differences.
    // simply render the newVTree and mount it.
    return $node => {
      const $newNode = render(newVTree);
      $node.replaceWith($newNode);
      return $newNode;
    };
  }

  const patchAttrs = diffAttrs(oldVTree.attrs, newVTree.attrs);
  const patchChildren = diffChildren(oldVTree.children, newVTree.children);
  const patchStylesheet = diffStylesheet(oldVTree.stylesheet, newVTree.stylesheet);
  const patchAction = diffAction(oldVTree.action, newVTree.action);

  return $node => {
    patchAttrs($node);
    patchChildren($node);
    patchStylesheet($node);
    patchAction($node);
    return $node;
  };
};

export default diff;