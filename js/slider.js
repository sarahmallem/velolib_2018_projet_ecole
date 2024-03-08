var mySlider = {
	indexSlide: 0,
	pause: true,
	ifChange: false,

	initSlides: function() {
		var listeSlides = document.getElementsByClassName("diaporama");

		// On cache toutes les images du slide
		for (i = 0; i < listeSlides.length; i++) {
			listeSlides[i].style.display = "none";
		}

		// On affiche l'image courante
		listeSlides[this.indexSlide].style.display = "block";

		var _this = this;
		setInterval(function() {_this.getSwitch() }, 5000);
	},

	move: function(param) {
		this.indexSlide = this.indexSlide + param;
		this.ifChange = true;

		var _this = this;
		setTimeout(function(){ this.ifChange = false },5000);

		this.showSlides();
	},

	showSlides: function() {
		var listeSlides = document.getElementsByClassName("diaporama");

		if (this.indexSlide >= listeSlides.length) // vérifie si on dépasse la derniere images
			this.indexSlide = 0;
		else if (this.indexSlide < 0) // vérifie si on souhaite descendre plus bas que la premiere images
			this.indexSlide = listeSlides.length - 1;


		// On cache toutes les images du slide
		for (i = 0; i < listeSlides.length; i++) {
			listeSlides[i].style.display = "none";
		}

		// On affiche l'image courante
		listeSlides[this.indexSlide].style.display = "block";
	},

	getSwitch: function() {
		if (this.pause && !this.ifChange) {
			this.indexSlide += 1;
			this.showSlides();
		}

	}

};

mySlider.initSlides();


// Fonctionnalité du slide

// Méthodes permettant la permutation
function move(param) {
	mySlider.indexSlide = mySlider.indexSlide + param;
	mySlider.ifChange = true;
	setTimeout(function(){ mySlider.ifChange = false },5000);
	mySlider.showSlides();
}

function pauseSlide() {
	mySlider.pause = !mySlider.pause;
}



// Changement des images du diaporama avec les touches du clavier
 document.addEventListener("keydown", function(e){
    if(e.keyCode === 37){
        move(-1);
    }
    else if(e.keyCode === 39){
        move(+1);
    }
	});
