window.onload = function() {

	var adlerKarte = L.map("routingmap");
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>'
	}).addTo(adlerKarte);
	
	adlerKarte.setView([47, 11], 10);

	/*
	var routing = L.Routing.control({
		waypoints: [
			L.latLng(47.26, 11.38),
			L.latLng(47, 12.54)
		]
	}).addTo(adlerKarte);

*/

};