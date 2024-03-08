function ajax(url, callback) {
	let requete = new XMLHttpRequest();

	//Execution de la requete en GET selon le protocol HTTP 1.1
	requete.open("GET", url)

	//Ajout d'un listener (Attend la réponse de la requête)
	requete.addEventListener("load", function () {
		//Si tout est bon (selon les codes standards du protocol HTTP) sinon on affiche une erreur
		if (requete.status >= 200 && requete.status < 400) {
			//Execution de la fonction passée en paramètre
			callback(requete.responseText);
		} else {
			console.log(requete.status + " " + requete.statusText + " " + url);
		}
	});

	//Si l'url n'est pas bon
	requete.addEventListener("error", function () {
		console.log("Erreur avec l'URL " + url);
	});

	//determine la fin de la requete
	requete.send(null);
}