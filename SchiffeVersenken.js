'use strict';
document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#gameboardHome')
		.addEventListener('click', markFieldH);

        var SchiffeH = [2, 3, 3, 4, 5],
            SchiffsIndex = 4,
            Schiffgroesse,
            letzterClick,
            NumSchiffsFelder = 0,
            SchiffsFelder = [],  
            fields = document.querySelectorAll('#gameboardHome button'); // fields ist die Liste unserer Felder


        function markFieldH(e) {
            var field = e.target,
                 nachbarn = [],
                 fi = parseInt(e.target.id);
            
            hintH.innerText = 'Platziere Dein ' + SchiffeH[SchiffsIndex] + 'er Schiff, Zelle für Zelle.';
            Schiffgroesse = SchiffeH[SchiffsIndex];

            if ((NumSchiffsFelder > 0) && (NumSchiffsFelder < Schiffgroesse)) {  // es werden die nächsten nachbarn in Ausdehnunge Richtung ermittelt und wieder enabled   
                if (fi == SchiffsFelder[NumSchiffsFelder-1]+1) { // ermittle die Richtung in welcher sich das Boot ausdehnt{  // Ausdehnung nach rechts 
                    if (fields[fi+1].getAttribute('aria-label')=='l') {
                        nachbarn.push((fi+1));
                        fields[fi+1].setAttribute('aria-label', "v");
                        fields[fi+1].disabled = false ;           } // rechter nachbar
                    fields[letzterClick-11].disabled = true;   // disable senkrechte Nachbarn
                    fields[letzterClick+11].disabled = true;          
                }         
                if (fi == SchiffsFelder[0]-1) { // ermittle die Richtung in welcher sich das Boot ausdehnt{  // Ausdehnung nach links
                    if (fields[fi-1].getAttribute('aria-label')=='l') {
                        nachbarn.push((fi-1));
                        fields[fi-1].setAttribute('aria-label', "v");
                        fields[fi-1].disabled = false;                   } // linker nachbar
                    fields[letzterClick-11].disabled = true;   // disable senkrechte Nachbarn
                    fields[letzterClick+11].disabled = true;          
                }
                if (fi == SchiffsFelder[NumSchiffsFelder-1]+11) { // ermittle die Richtung in welcher sich das Boot ausdehnt{  // Ausdehnung nach unten 
                    if (fi < 110 && fields[fi+11].getAttribute('aria-label')=='l') {
                        nachbarn.push((fi+11));
                        fields[fi+11].setAttribute('aria-label', "v");
                        fields[fi+11].disabled = false;                   } // unterer nachbar
                    fields[letzterClick-1].disabled = true;   // disable waagrechte Nachbarn
                    fields[letzterClick+1].disabled = true;          
                }         
                if (fi == SchiffsFelder[0]-11) { // ermittle die Richtung in welcher sich das Boot ausdehnt{  // Ausdehnung nach oben
                    if (fields[fi-11].getAttribute('aria-label')=='l') {
                        nachbarn.push((fi-11));
                        fields[fi-11].setAttribute('aria-label', "v");
                        fields[fi-11].disabled = false;                   } // oberer nachbar
                    fields[letzterClick-1].disabled = true;   // disable senkrechte Nachbarn
                    fields[letzterClick+1].disabled = true;          
                }                
  
                // das gwählte Feld wird gesetzt  
                field.setAttribute('aria-label', "y");
                field.disabled = true;
                SchiffsFelder.push(fi);
                SchiffsFelder.sort();
            }            
            if (NumSchiffsFelder == 0) {      // alle Felder sind verfügbar
                letzterClick = fi;
                SchiffsFelder.push(fi);
                // es werden alle Felder die noch nicht disabled sind mit dem label 'l' als locked gekenzeichnet.
                for (var i = 0; i < fields.length; i++) {
                    if (!fields[i].disabled) {
                        fields[i].setAttribute('aria-label', "l");
                    }
                }  
                // das gewählte Feld wird gesetzt  
                field.setAttribute('aria-label', "y");
                field.disabled = true;
                // jetzt werden alle angrenzenden Felder ermittelt und das 'locked label durch ein v =  valid ersetzt
                if (!fields[fi-1].disabled) {nachbarn.push((fi-1));fields[fi-1].setAttribute('aria-label', "v");   } // linker nachbar
                if (!fields[fi+1].disabled) {nachbarn.push((fi+1));fields[fi+1].setAttribute('aria-label', "v");} // rechter nachbar                
                if (!fields[fi-11].disabled) { nachbarn.push((fi-11)); fields[fi-11].setAttribute('aria-label', "v");} // oberer nachbar
                if (fi < 110 && !fields[fi+11].disabled) { nachbarn.push((fi+11)); fields[fi+11].setAttribute('aria-label', "v");} // unterer nachbar
                 
                // alle Felder die nicht angrenzen jetzt also locked sind werden jetzt disabled um ungültige clicks zu verhindern.                
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i].getAttribute('aria-label') == "l") {
                        fields[i].disabled = true;
                    }
                }
            }
            if (NumSchiffsFelder < Schiffgroesse) {NumSchiffsFelder ++;}
            else {
                NumSchiffsFelder = 0; 
                if (SchiffsIndex > 0) { SchiffsIndex--;}
                else {  // alle Schiffe sind plaziert das Feld wird versiegelt
                    for (var i = 0; i < fields.length; i++) {
                        fields[i].disabled = true;
                    }
                }

            }    
        }


        document.querySelector('#gameboardEnemy')
		.addEventListener('click', markFieldE);

        function markFieldE(e) {
            var field = e.target;
            field.setAttribute('aria-label', "o");
            field.disabled = true;
        }


});