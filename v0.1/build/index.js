APP_MODE = 'android'; // android or ios
DEFAULT_CLICK_DELAY = 0; // miliseconds
BUTTON_CLICK_DELAY = 0; // miliseconds
NEXT_PAGE_DELAY = 250; // miliseconds
PREV_PAGE_DELAY = 50; // miliseconds

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

if (!String.prototype.splice) {
    /**
     * {JSDoc}
     *
     * The splice() method changes the content of a string by removing a range of
     * characters and/or adding new characters.
     *
     * @this {String}
     * @param {number} start Index at which to start changing the string.
     * @param {number} delCount An integer indicating the number of old chars to remove.
     * @param {string} newSubStr The String that is spliced in.
     * @return {string} A new string with the spliced substring.
     */
    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

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

this._iv_ = [];
this._ivbn_ = {};
this._ivbnu_ = {};
this._ic_ = 0;
this._is_ = {};
this._ivn_ = null;

function __initPage(classPage, initialName) {
	const className = classPage.name;
	this._ivbn_[initialName] = this._ic_;
	this._ivbnu_[this._ic_] = initialName;
	this._iv_[this._ic_] = {
		cn: className,
		in: initialName,
		ct: classPage,
	}
	this._ic_++;
}

function createPage(_a) {
	for (var _i in _a) {
		__initPage(_a[_i], _i);
	}
}

function __startPage__(_idp_) {
	this.props = {
		pageNumber: this._ivn_,
		definePage: _idp_,
		pageByName: this._ivbn_,
		pageByNumber: this._ivbnu_,	
	}
	this.that = new _idp_.ct(this.props, this._is_);
}

function __runPage__(_class = "", _classFake = "") {
	const _idp_ = this._iv_[this._ivn_];
	__startPage__(_idp_);
	__genFakeView__(_classFake);
	__genView__(this.that, _idp_, this._ivn_, _class);
	__genStyle__(this.that, _idp_, this._ivn_);
	this.that.onStart(_idp_);
}

function loadPage() {
	this._ivn_==null ? this._ivn_ = 0 : this._ivn_;
	__runPage__();
}

function animationOpenPage(initialName, stat, className, classNameFake) {
	this._ivn_ = this._ivbn_[initialName];
	let dly = 0;
	stat=='prev'?dly=PREV_PAGE_DELAY:null;
	stat=='next'?dly=NEXT_PAGE_DELAY:null;
	let st = setTimeout(() => {
		__runPage__(className, classNameFake);
		clearTimeout(st);
	}, dly);
}

class Component {
	
	constructor(main, state) {
		this.main = main;
		this.state = state;
	}

	view() {
		return "<h1>Kosong Bro</h1>";
	}

	style(css) {
		css("body", "margin:0px;padding:0px;");
	}

	onStart(init) {
		console.log(init.in+" Not Defined onStart");
	}

	async navigate(page) {
		const prev = this.main.pageNumber;
		const curr = this.main.pageByName[page];
		let mode = "md";
		APP_MODE=="android"?mode="md":null;
		APP_MODE=="ios"?mode="ios":null;
		if (prev > curr) {
			animationOpenPage(page, "prev", "slide-stack", "slide-"+mode+"-close");
		} else {
			animationOpenPage(page, "next", "slide-"+mode+"-open", "");
		}
	}
}

var xhttp;

if (window.XMLHttpRequest) {
	xhttp = new XMLHttpRequest();
} else {
	xhttp = new ActiveXObject("Microsoft.XMLHTTP");
}


async function fetch(params, response) {
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			response(this.responseText);
		}
	}
	await xhttp.open(typeof(params.method)!=="undefined"?params.method:"GET", params.url, true);
	xhttp.send();
}

fetch.prototype = {
	constructor: fetch,
}

class Home extends Component {
	
	constructor(main, state) {
		super(main);
		this.state = state;
		this.strNama = this.state["nama"];
	}

	view() {
		return `
			<div class="header">
				<div class="title">Bad Framework</div>
			</div>
			<div class="content">
				<div class="row">
					<div class="col s12 m6">
					  <div class="card blue-grey darken-1">
					    <div class="card-content white-text">
					      <span class="card-title">Card Title</span>
					      <p>I am a very simple card. I am good at containing small bits of information.
					      I am convenient because I require little markup to use effectively.</p>
					    </div>
					    <div class="card-action">
					      <a href="#">This is a link</a>
					      <a href="#">This is a link</a>
					    </div>
					  </div>
					</div>
				</div>
				  <div class="row">
				    <div class="col s12 m7">
				      <div class="card">
				        <div class="card-image">
				          <img src="images/sample-1.jpg">
				          <span class="card-title">Card Title</span>
				        </div>
				        <div class="card-content">
				          <p>I am a very simple card. I am good at containing small bits of information.
				          I am convenient because I require little markup to use effectively.</p>
				        </div>
				        <div class="card-action">
				          <a href="#">This is a link</a>
				        </div>
				      </div>
				    </div>
				  </div>  <ul class="collection">
    <li class="collection-item avatar">
      <img src="images/yuna.jpg" alt="" class="circle">
      <span class="title">Title</span>
      <p>First Line <br>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    </li>
    <li class="collection-item avatar">
      <i class="material-icons circle">folder</i>
      <span class="title">Title</span>
      <p>First Line <br>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    </li>
    <li class="collection-item avatar">
      <i class="material-icons circle green">insert_chart</i>
      <span class="title">Title</span>
      <p>First Line <br>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    </li>
    <li class="collection-item avatar">
      <i class="material-icons circle red">play_arrow</i>
      <span class="title">Title</span>
      <p>First Line <br>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    </li>
  </ul>
				<div>BAIK <span class="badge" id="nama"></span></div>
				<input type="text" id="input" class="input-field inline">
				<a class="waves-effect waves-light btn-large" id="btnNext">Ke Halaman Selanjutnya</a>
				<div>Aplikasi Ini Mulai dari mana Ya???? <span id="nama"></span></div>
			</div>
		`;
	}

	style(css) {
		css(".header", "background-color:blue;");
		css(".header", "color:#FFF;");
	}

	onStart(init) {
		this.input = new Input("input");
		this.nama = new Text("nama");
		this.btnNext = new Button("btnNext");
		this.input.setValue(this.strNama);
		this.nama.setText(this.strNama);
		this.getData();
		this.input.keyup((val) => {
			this.nama.setText(val);
			this.state["nama"] = val;
		});
		this.nama.click((e) => {
			alert('page');
		});
		this.btnNext.click((e) => {
			this.navigate('page');
		});
	}

	async getData() {
		await fetch({
			url: "https://api.banghasan.com/sholat/format/json/kota/kode/586",
			method: "POST"
		}, (val) => {
			this.nama.setText(val);
		});
	}

}

class Page1 extends Component {
	
	constructor(main, state) {
		super(main);
		this.state = state;
		this.nama = this.state["nama"];
	}

	view() {
		return `
			<div class="header">
				<div class="title">Halaman 1</div>
			</div>
			<div class="content">
				<h1 id="judul">Page 1</h1>
				<a class="waves-effect waves-light btn" id="btn-kembali"><< KEMBALI KE HOME</a>
				<a class="waves-effect waves-light btn" id="btn-page">PAGE 2</a><br>
			</div>
		`;
	}

	onStart(init) {
		this.judul = new Text("judul");
		this.btnKembali = new Button("btn-kembali");
		this.btnPage = new Button("btn-page");
		this.judul.setText(this.nama);
		this.btnKembali.click((e) => {
			this.navigate('home');
		});
		this.btnPage.click((e) => {
			this.navigate('page2');
		});
	}

	style(css) {
		css(".header", "background-color:red;")
	}

}

class Page2 extends Component {
	
	constructor(main) {
		super(main);
	}

	view() {
		return `
			<div class="header">
				<div class="title">Halaman 2</div>
			</div>
			<div class="content">
				<h1 id="judul">Page 2</h1>
				<button onclick="that.toHome()"><< KEMBALI KE HOME</button>
				<button onclick="that.toPage()"><< PAGE 1</button>
				<button onclick="that.toPage3()">PAGE 3 >></button>
			</div>
		`;
	}

	onStart(init) {
		this.judul = new Text("judul");
		this.judul.setText("Selamat Datang di halaman Kedua");
	}

	toHome() {
		this.navigate('home');
	}

	toPage() {
		this.navigate('page');
	}

	toPage3() {
		this.navigate('page3');
	}

}

class Page3 extends Component {
	
	constructor(main) {
		super(main);
	}

	view() {
		return `
			<div class="header">
				<div class="title">Halaman 3</div>
			</div>
			<div class="content">
				<h1 id="judul">Page 3</h1>
				<h1>Page 3</h1>
				<h1>Page 3</h1>
				<h1>Page 3</h1>
				<h1>Page 3</h1>
				<button onclick="that.toHome()"><< KEMBALI KE HOME</button>
				<button onclick="that.toPage2()"><< PAGE 2</button>
			</div>
		`;
	}

	style(css) {
		css(".header", "background-color:yellow;color:#000;");
	}

	onStart(init) {
		this.judul = new Text("judul");
		this.judul.setText("Halaman Ketiga yaitu halaman terakhir");
	}

	toHome() {
		this.navigate('home');
	}

	toPage2() {
		this.navigate('page2');
	}

}

createPage({ 
	home: Home,
	page: Page1,
	page2: Page2,
	page3: Page3,
});

loadPage();