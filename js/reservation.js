

// Création d'un pop-up sur mon bouton de réservation + appeller un id de ma page html

// Declaration d'une function appeller OpenModal()

function openModal() {



	// vérifions si le prénom et le nom sont renseignés
	if (document.getElementById("firstname").value.length == 0 || document.getElementById("lastname").value.length == 0) {
		alert("Veuillez renseigner tous les champs")
	} else {
		// Stocker popup dans le nom de la variable
		let element = document.getElementById('popup');



		// Reverse sur l'élément Si le pop-up est faux ou vrai sinon il est faux.
		if (element.hidden == false) {
			element.hidden = true;
		} else {
			element.hidden = false;
		}


	}

}

//______________BOUTON _________________________



//___________ LOCALSTORAGE ET SESSIONSTORAGE___________________

//On ajoute un écouteur d'évènement sur le bouton valider. Quand on clique cela appel la fonction clickFunction()
document.getElementById('boutonvalider').addEventListener("click", clickFunction);
document.getElementById('firstname').value = localStorage.getItem('nom');
document.getElementById('lastname').value = localStorage.getItem('prenom');

var information = document.getElementById('informations');
information.style.display = "none";


//Ajoute les données dans le localStorage
function clickFunction() {
	// dans localstorage
	localStorage.setItem('nom', document.getElementById('firstname').value);
	localStorage.setItem('prenom', document.getElementById('lastname').value);
	information.style.display = "block";

	// on stocke ça dans session storage
	sessionStorage.setItem("address", document.getElementById('address').innerHTML);
	sessionStorage.setItem("dateReservation", new Date());

	/// maintenant on change les valeurs dans le html
	document.getElementById('gareReserve').innerHTML = sessionStorage.getItem("address")
	document.getElementById('personneReserve').innerHTML = localStorage.getItem("nom") + " " + localStorage.getItem("prenom")


	let startDate = new Date(sessionStorage.getItem("dateReservation"))
	let endDate = new Date() // date dans 20 min


	// calcule la difference de temps
	let tempsRestant = endDate.getTime() + 20 * 60000 - startDate.getTime()
	tempsRestant = Math.round(tempsRestant / 60000)
	document.getElementById("tempsRestant").innerHTML = tempsRestant

	// decompteur

	// toutes les 60 secondes le temps restant se décrémente (-1 à chaque minute)
	setInterval(() => {
		if (tempsRestant > 0) {
			tempsRestant--;
			document.getElementById("tempsRestant").innerHTML = tempsRestant
		}
	}, 60000)



}


//___________ CANVAS ___________________

//contient le canvas 
let canvas = document.getElementById('signature');

//Variable globale qui contient l'objet contexte du canvas
var context = canvas.getContext("2d");


// Contient les positions X et Y de la souris qui sont stocker dans un array
let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();
let paint;

//Ajoute un évènement qui écoute si le bouton de la souris est maintenu
canvas.addEventListener('mousedown', function (e) {

	let mouseX = e.pageX - (this.offsetLeft + this.offsetParent.offsetLeft);
	let mouseY = e.pageY - (this.offsetTop + this.offsetParent.offsetTop);

	//on indique que l'on peut enregistrer les position afin de tracer sur le canvas les lignes		
	paint = true;
	//on sauvegarde la position
	addClick(mouseX, mouseY);
	//on exectute la fonction qui dessine tout les points
	redraw();
});

//Ajoute un évènement qui écoute si la souris bouge
canvas.addEventListener('mousemove', function (e) {
	if (paint) {
		let mouseX = e.pageX - (this.offsetLeft + this.offsetParent.offsetLeft);
		let mouseY = e.pageY - (this.offsetTop + this.offsetParent.offsetTop);
		addClick(mouseX, mouseY, true);
		redraw();
	}
});
       

//Evenement pour dire que l'on ne doit plus enregistrer la position de la souris si on relache le bouton principal
canvas.addEventListener('mouseup', function (e) {
	paint = false;
});

//Pareil si la souris quitte la zone du canvas
canvas.addEventListener('mouseleave', function (e) {
	paint = false;
});

//Enregistre les positions dans un tableau propre à chaque point
function addClick(x, y, dragging) {
	clickX.push(x);
	clickY.push(y * 0.75);
	clickDrag.push(dragging);
}


// Dessine tout les points en fonction des données dans les tableau de points
function redraw() {

	context.clearRect(0, 0, context.canvas.width, context.canvas.height); //Efface le canvas

	//Définit la couleur du trait
	context.strokeStyle = "#000000";
	context.lineJoin = "round";
	//Définit l'épaisseur du trait
	context.lineWidth = 5;

	//Parcours des tableaux pour (dessine chaque point sur le canvas)		
	for (let i = 0; i < clickX.length; i++) {
		context.beginPath();
		if (clickDrag[i] && i) {
			context.moveTo(clickX[i - 1], clickY[i - 1]);
		} else {
			context.moveTo(clickX[i] - 1, clickY[i]);
		}
		context.lineTo(clickX[i], clickY[i]);
		context.closePath();
		context.stroke();
	}
}


/// fonction pour effacer

function erase() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height); //Efface le canvas
	// vidage des listes qui contiennent les points de la signature
	clickX = []
	clickY = []
}