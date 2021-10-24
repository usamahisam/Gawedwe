function __fakeView__(_fV_, _class) {
	_fV_ = _fV_.replace(/id="([^"]+)"/g, function(x) {
		x = x.splice(-1, 0, "_fake");
		return x;
	});
	_fV_ = _fV_.replace('class="page', 'class="page_fake');
	_fV_ = _fV_.replace("onclick", "[rm]");
	_fV_ = _fV_.replace("onkeyup", "[rm]");
	_fV_ = _fV_.replace("slide-stack", _class);
	_fV_ = _fV_.replace("slide-ios-open", _class);
	_fV_ = _fV_.replace("slide-ios-clode", _class);
	_fV_ = _fV_.replace("slide-md-open", _class);
	_fV_ = _fV_.replace("slide-md-close", _class);
	return _fV_;
}

function __genFakeView__(_class = "") {
	let cacheAppMain = appRootElement.innerHTML;
	let cacheStyleMain = styleRootElement.innerHTML.replace(/app-main/g, "app-fakestack");
	cacheAppMain = __fakeView__(cacheAppMain, _class);
	cacheAppMain.length>wsh*7?cacheAppMain=cacheAppMain.substring(0,wsh*7):null;
	fakeStackRootElement.innerHTML = '<style>'+cacheStyleMain+'</style>'+cacheAppMain;
	let st = setTimeout(() => {
		fakeStackRootElement.innerHTML = '';
		clearTimeout(st);
	}, 300);
}

node = null;

function __genView__(_u, _a, _initAlg, _class = "") {
	node!=null?appRootElement.removeChild(node):null;
    node = doc.createElement("div");
    node.className = "page "+_class;
    node.setAttribute("id", _a.in);
    node.setAttribute("name", _a.cn);
    node.innerHTML = _u.view();
	appRootElement.appendChild(node);
}