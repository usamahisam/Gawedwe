let doc = document;
let w = window;
let ws = w.screen;
let wsw = ws.width;
let wsh = ws.height;

this.getID = (i) => {
	return doc.getElementById(i);
}

this.getClass = (c) => {
	return doc.getElementsByClassName(c);
}

this.removeClassByClass = (c, rc) => {
	const cv = this.getClass(c)[0];
	typeof(cv)!=="undefined"?cv.classList.remove(rc):null;
}

this.setStyleProperty = (name, value) => {
	doc.body.style.setProperty(name, value);
}

this.getStyleProperty = (name) => {
	return doc.body.style.getPropertyValue(name);
}

this.appRootElement = this.getID("rootMain");
this.fakeStackRootElement = this.getID("rootFakeStack");
this.styleRootElement = this.getID("rootStyle");