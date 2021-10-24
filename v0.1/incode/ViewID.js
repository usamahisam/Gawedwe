class ViewID {
	constructor(name) {
		this.id = getID(name);
	}

	click(f) {
		this.id.addEventListener("click", (e) => {
			this.st = setTimeout(() => {
				f(e);
				clearTimeout(this.st);
			}, DEFAULT_CLICK_DELAY);
		});
	}
}

class Text extends ViewID {
	constructor(name) {
		super(name);
		this.id = getID(name);
	}

	setText(text) {
		typeof(text)!=="undefined" ? text = text : text = "";
		this.id.textContent = text;
	}

	getText() {
		typeof(text)!=="undefined" ? text = text : text = "";
		return this.id.textContent;
	}
}

class Input extends ViewID {
	constructor(name) {
		super(name);
		this.id = getID(name);
	}

	keyup(f) {
		this.id.addEventListener("keyup", (e) => {
			f(this.id.value);
		});
	}

	setValue(text) {
		typeof(text)!=="undefined" ? text = text : text = "";
		this.id.value = text.toString();
		this.id.setAttribute("value", text);
	}

	getValue() {
		let _v = this.id.value.toString();
		this.id.setAttribute("value", _v);
		typeof(_v)!=="undefined" ? _v = _v : _v = "";
		return _v;
	}
}

class Button extends ViewID {
	constructor(name) {
		super(name);
		this.id = getID(name);
	}

	click(f) {
		this.id.addEventListener("click", (e) => {
			this.st = setTimeout(() => {
				f(e);
				clearTimeout(this.st);
			}, BUTTON_CLICK_DELAY);
		});
	}
}