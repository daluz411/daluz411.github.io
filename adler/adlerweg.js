/***
	Adlerweg Skript
	zeigt vier Etappen des Adlerwegs auf einer Leaflet-Karte mit Photos von Panoramio und Wikipedia Verlinkung
 	Hintergrund Karte: basemap.at
***/

window.onload = function() {
            var adlerKarte = L.map("adlerkarteDiv");
            var layers = { // http://www.basemap.at/wmts/1.0.0/WMTSCapabilities.xml
                geolandbasemap: L.tileLayer("http://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
                    subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                    attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
                }),
                bmapoverlay: L.tileLayer("http://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
                    subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                    attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
                }),
                bmapgrau: L.tileLayer("http://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
                    subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                    attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
                }),
                bmaphidpi: L.tileLayer("http://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
                    subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                    attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
                }),
                bmaporthofoto30cm: L.tileLayer("http://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
                    subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                    attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
                })
            };

            adlerKarte.addLayer(layers.geolandbasemap);
            var etappe01 = L.geoJson(etappe01json, {
                style: {
                    color: "#ff0000",
                    weight: 15
                }
            });
            var etappe02 = L.geoJson(etappe02json, {
                style: {
                    color: "#FF00FF",
                    weight: 15
                }
            });
            var etappe03 = L.geoJson(etappe03json, {
                style: {
                    color: "#FE9A2E",
                    weight: 15
                }
            });
            var etappe04 = L.geoJson(etappe04json, {
                style: {
                    color: "#2E9AFE",
                    weight: 15
                }
            });
            var etappenGruppe = L.featureGroup([etappe01, etappe02, etappe03, etappe04]);
            adlerKarte.addLayer(etappenGruppe);
            adlerKarte.fitBounds(etappenGruppe.getBounds());

            etappe01.bindPopup("<b>Adlerweg Etappe 01</b>");
            etappe02.bindPopup("<b>Adlerweg Etappe 02</b>");
            etappe03.bindPopup("<b>Adlerweg Etappe 03</b>");
            etappe04.bindPopup("<b>Adlerweg Etappe 04</b>");
            L.control.layers({
                "Geoland Basemap": layers.geolandbasemap,
                "Geoland Basemap Overlay": layers.bmapoverlay,
                "Geoland Basemap Grau": layers.bmapgrau,
                "Geoland Basemap High DPI": layers.bmaphidpi,
                "Geoland Basemap Orthofoto": layers.bmaporthofoto30cm
            }, {
                "Etappen Adlerweg": etappenGruppe
            }).addTo(adlerKarte)

            var bounds = etappenGruppe.getBounds();
            var url = 'http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20' +
                '&minx=' + bounds.getWest() +
                '&miny=' + bounds.getSouth() +
                '&maxx=' + bounds.getEast() +
                '&maxy=' + bounds.getNorth() +
                '&size=mini_square&mapfilter=true&callback=zeigBilder';
            var script = document.createElement("script");
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
            window.zeigBilder = function(data) {
                for (var i = 0; i < data.photos.length; i++) {
                    console.log("Photo titel: ", i, data.photos[i].photo_title);
                    L.marker(
                            [data.photos[i].latitude, data.photos[i].longitude], {
                                icon: L.icon({
                                    iconUrl: data.photos[i].photo_file_url
                                })
                            }
                        ).bindPopup("<h2>" + data.photos[i].photo_title + "</h2>" +
                            "<a href='" + data.photos[i].photo_url + "'>Link zum Bild</a>")
                        .addTo(adlerKarte);
                }
            }
            var url = 'http://api.geonames.org/wikipediaBoundingBoxJSON?username=oeggl' +
                '&west=' + bounds.getWest() +
                '&south=' + bounds.getSouth() +
                '&east=' + bounds.getEast() +
                '&north=' + bounds.getNorth() +
                '&lang=de' +
                '&callback=zeigWikis';
            var script = document.createElement("script");
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
            window.zeigWikis = function(data) {
                // marker add, popup add, link add
                for (var i = 0; i < data.geonames.length; i++) {
                    L.marker(
                            [data.geonames[i].lat, data.geonames[i].lng], {
                                icon: L.icon({
                                    iconUrl: "http://findicons.com/files/icons/111/popular_sites/128/wikipedia_globe_icon.png",
                                    iconSize: [30, 30]
                                })
                            }
                        ).bindPopup("<h2>" + data.geonames[i].title + "</h2>" +
                            "<a href='http://" + data.geonames[i].wikipediaUrl + "'>Link zum Wiki</a>")
                        .addTo(adlerKarte);
                }
            }


        };