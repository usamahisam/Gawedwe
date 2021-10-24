/*
    Filename Object Proxy
    author: Ushama Mustikohisam
*/

function randomString(l = 8){
    var result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrtuvwxyz';
    let charactersLength = characters.length;
    for (let i = 0; i < l; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var isEqual = function (value, other) {

	// Get the value type
	var type = Object.prototype.toString.call(value);

	// If the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(other)) return false;

	// If items are not an object or array, return false
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

	// Compare the length of the length of the two items
	var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
	var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
	if (valueLen !== otherLen) return false;

	// Compare two items
	var compare = function (item1, item2) {

		// Get the object type
		var itemType = Object.prototype.toString.call(item1);

		// If an object or array, compare recursively
		if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
			if (!isEqual(item1, item2)) return false;
		}

		// Otherwise, do a simple comparison
		else {

			// If the two items are not the same type, return false
			if (itemType !== Object.prototype.toString.call(item2)) return false;

			// Else if it's a function, convert to a string and compare
			// Otherwise, just compare
			if (itemType === '[object Function]') {
				if (item1.toString() !== item2.toString()) return false;
			} else {
				if (item1 !== item2) return false;
			}

		}
	};

	// Compare properties
	if (type === '[object Array]') {
		for (var i = 0; i < valueLen; i++) {
			if (compare(value[i], other[i]) === false) return false;
		}
	} else {
		for (var key in value) {
			if (value.hasOwnProperty(key)) {
				if (compare(value[key], other[key]) === false) return false;
			}
		}
	}

	// If nothing failed, return true
	return true;

};

var style = document.createElement("style");
style.appendChild(document.createTextNode(""));
document.head.appendChild(style);


var dataStyleName = [];
var dataStyleProps = [];
var dataStyleObject = [];
var styleCount = 0;

export class Stylesheet {
    constructor(props, editable = false) {
		let self = this;
		self.name = null;
		self.sheet = {};
		// if editable true adding new class and change as dynamic, 
		// if editable false checking all same objects and static
		if (!editable) {
			for (var item2 in dataStyleObject) {
				if (isEqual(dataStyleProps[item2], props)) {
					self.name = dataStyleName[item2];
					self.sheet = dataStyleObject[item2];
					break;
				}
			}
		}
		if (self.name == null) {
			self.name = randomString(5);
			style.sheet.insertRule('.'+self.name+' {}', styleCount);
			self.sheet = style.sheet.cssRules[styleCount].style;
			for (var item in props) {
				self.sheet[item] = props[item];
			}
			dataStyleName.push(self.name);
			dataStyleProps.push(props);
			dataStyleObject.push(self.sheet);
			styleCount++;
		}
		if (!editable) {
			var iOf = dataStyleName.indexOf(self.name);
			self.sheet = dataStyleProps[iOf];
		}
    }
}


var css_body = new Stylesheet({
	fontFamily: 'roboto, tahoma',
	margin: '0px',
}, true);
document.body.classList.add(css_body.name);


function createWidget(tagName, props) {
	const $el = document.createElement(tagName);
	props({self: $el, style: (css) => {
		$el.classList.add(css.name);
	}});
	$el.style = null;
	$el.removeAttribute('style');
	let observer = new MutationObserver((mutations, observer) => {
		mutations.map((m) => {
			// console.log(m.target.style.cssText);
			$el.removeAttribute('style');
			return false;
		});
	});
	observer.observe($el, {attributes: true});
	return $el;
}

const $_app = document.getElementById("app");
var css_app = new Stylesheet({
	width: '100vw',
	height: '100vh',
}, true);
$_app.classList.add(css_app.name);

export function runApp(render) {
	$_app.appendChild(render);
	return render;
}

export function StatusBarColor(color) {
    document.getElementsByName('theme-color')[0].setAttribute('content', color);
}

export class Component {
    constructor(self) {
		var render = this.main({ createWidget: createWidget });
		typeof self !== 'undefined' ? self(this) : '';
		return render;
	}
}