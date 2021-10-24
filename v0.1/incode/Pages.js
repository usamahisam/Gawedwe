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