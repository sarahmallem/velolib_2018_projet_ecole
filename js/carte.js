// Création de la map, les coordonnés et le zoom 
let mymap = L.map('map').setView([48.692054, 6.184417], 14);
var markers;
// Charger un calque d'une carte avec le copyright
L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	attribution: 'donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
	minZoom: 1,
	maxZoom: 20
}).addTo(mymap);


// __________________________________AJAX_________________________________________________


// Variable Apikey avec la clé de JCDecaux et de la ville de Nancy
let apiKey = 'f9c6ed345da0391249411fd8cb21d3815418b1a8'
let ville = 'Nancy'


// fonction qui s'execute une fois un marker clique, le paramètre e correspond au données stockées dans le marker
function onClickMarker(marker) {

	let lat = marker.latlng.lat // on récupère la longitude et la latitude du marker
	let itemClicked = markers.filter(marker => marker.position.lat == lat)[0] // on filter pour trouver l'établissement qui a comme latitude celle du marker

	let address = itemClicked.address;
	let available_bikes = itemClicked.available_bikes;

	// afficher l'address dans le html


	document.getElementById("address").innerHTML = address;
	document.getElementById("available_bikes").innerHTML = available_bikes;

}
//Appel de la fonction ajax qui se trouve dans le fichier ajax.js.
ajax('https://api.jcdecaux.com/vls/v1/stations?contract=' + ville + '&apiKey=' + apiKey, function (data) {
	//Conversion des données (string) en JSON
	markers = JSON.parse(data)
	console.log(markers)

	// Une boucle for sur toutes les positions de vélostan'lib Nancy avec un tableau.




	// création d'une icone verte
	let greenIcon = new L.Icon({
		iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});


	// création d'une icone rouge
	let redIcon = new L.Icon({
		iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});





	for (let item of markers) {
		let icon;
		// si le statut est CLOSED on choisit de mettre une icone rouge
		if (item.available_bikes == 0) {
			icon = redIcon;
		} else {
			// sinon on met une icone verte
			icon = greenIcon;
		}

		L.marker([
			item['position']['lat'],
			item['position']['lng'],
		], {
			icon: icon
		}).on('click', onClickMarker).addTo(mymap); // utilisation du ternaire

	}
});
