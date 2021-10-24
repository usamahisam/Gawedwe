export var AnimateFrame = function(status, view, closeTime){
	view.style.transition = 'all .280s ease-in-out';
	if (status == 'ready') {
		view.style.opacity = '0.0';
		view.style.left = '0';
		setTimeout(() => {
			view.style.opacity = '1.0';
		}, 100);
	} else if (status == 'open') {
		view.style.left = '100vw';
		setTimeout(() => {
			view.style.left = '0';
		}, 10);
	} else if (status == 'close') {
		setTimeout(() => {
			view.style.left = '100vw';
		}, 10);
	} else if (status == 'covered') {
		setTimeout(() => {
			view.style.left = '-20vw';
		}, 50);
	} else if (status == 'coveredclose') {
		setTimeout(() => {
			view.style.left = '0vw';
		}, 10);
	}
	closeTime(400);
}