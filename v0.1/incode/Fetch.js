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