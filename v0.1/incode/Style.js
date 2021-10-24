function __Xstyle__(_u, _a, _p = "") {
	ea = {};
	_u.style((e, c) => {
		typeof(ea[e])==="undefined" ? ea[e] = c : ea[e] += c;
	});
	let cc = "";
	for (var item in ea) {
		cc += _p+" "+item+"{"+ea[item]+"}";
	}
	return cc;
}

function __genStyle__(_u, _a, _initAlg) {
	styleRootElement.innerHTML = __Xstyle__(_u, _a, "app-main");
}