'use strict';
document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#gameboardHome')
		.addEventListener('click', markFieldH);

        var SchiffeH = [2, 3, 3, 4, 5],
            SchiffsIndex = 4,
            Schiffgroesse,
            SchiffsRichtung,
            letzterClick,
            NumSchiffsFelder = 0,
            SchiffsFelder = [],  
            fields = document.querySelectorAll('#gameboardHome button'); // fields ist die Liste unserer Felder


        function markFieldH(e) {
            var field = e.target,
                 nachbarn = [],
                 sf,
                 fi = parseInt(e.target.id);
            
            Schiffgroesse = SchiffeH[SchiffsIndex];

            if ((NumSchiffsFelder > 0) && (NumSchiffsFelder < Schiffgroesse)) {  // es werden die nächsten nachbarn in Ausdehnunge Richtung ermittelt und wieder enabled   
                if (fi == SchiffsFelder[NumSchiffsFelder-1]+1) { // ermittle die Richtung in welcher sich das Boot ausdehnt{  // Ausdehnung nach rechts 
                    SchiffsRichtung = 'waagrecht';
                    
                    if (fields[fi+1].getAttribute('aria-label')=='l') {
                        nachbarn.push((fi+1));
                        fields[fi+1].setAttribute('aria-label', "v");
                        fields[fi+1].disabled = false ;           } // rechter nachbar
                    fields[letzterClick-11].disabled = true;
                    fields[letzterClick-11].setAttribute('aria-label', "l");
                    fields[letzterClick+11].disabled = true;
                    fields[letzterClick+11].setAttribute('aria-label', "l");
                    if (NumSchiffsFelder == 1) {
                            
                    }        
                }         
                if (fi == SchiffsFelder[0]-1) { // ermittle die Richtung in welcher sich das Boot ausdehnt{  // Ausdehnung nach links
                    SchiffsRichtung = 'waagrecht';
                    if (fields[fi-1].getAttribute('aria-label')=='l') {
                        nachbarn.push((fi-1));
                        fields[fi-1].setAttribute('aria-label', "v");
                        fields[fi-1].disabled = false;                   } // linker nachbar
                    fields[letzterClick-11].disabled = true;
                    fields[letzterClick-11].setAttribute('aria-label', "l");
                    fields[letzterClick+11].disabled = true; 
                    fields[letzterClick+11].setAttribute('aria-label', "l");         
                }
                if (fi == SchiffsFelder[NumSchiffsFelder-1]+11) { // ermittle die Richtung in welcher sich das Boot ausdehnt{  // Ausdehnung nach unten 
                    SchiffsRichtung = 'senkrecht';
                    if (fi < 110 && fields[fi+11].getAttribute('aria-label')=='l') {
                        nachbarn.push((fi+11));
                        fields[fi+11].setAttribute('aria-label', "v");
                        fields[fi+11].disabled = false;                   } // unterer nachbar
                    fields[letzterClick-1].disabled = true;// disable waagrechte Nachbarn
                    fields[letzterClick-1].setAttribute('aria-label', "l");
                    fields[letzterClick+1].disabled = true; 
                    fields[letzterClick+1].setAttribute('aria-label', "l");         
                }         
                if (fi == SchiffsFelder[0]-11) { // ermittle die Richtung in welcher sich das Boot ausdehnt{  // Ausdehnung nach oben
                    SchiffsRichtung = 'senkrecht';
                    if (fields[fi-11].getAttribute('aria-label')=='l') {
                        nachbarn.push((fi-11));
                        fields[fi-11].setAttribute('aria-label', "v");
                        fields[fi-11].disabled = false;                   } // oberer nachbar
                    fields[letzterClick-1].disabled = true;   // disable senkrechte Nachbarn
                    fields[letzterClick-1].setAttribute('aria-label', "l");
                    fields[letzterClick+1].disabled = true;
                    fields[letzterClick+1].setAttribute('aria-label', "l");          
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
            if (NumSchiffsFelder < Schiffgroesse -1) {NumSchiffsFelder ++;}
            else {  // wenn das letzte Feld des Schiffes gesetzt ist werden die umrandeden Felder mit 'u' gekennzeichnet
                for (let j = 0; j < SchiffsFelder.length; j++) {
                    sf = SchiffsFelder[j];
                    if (SchiffsRichtung == 'waagrecht'){
                        if (fields[sf-11].getAttribute('aria-label') == "l") {
                            fields[sf-11].setAttribute('aria-label', "u");}
                        if (sf < 110 &&  fields[sf+11].getAttribute('aria-label') == "l") {
                            fields[sf+11].setAttribute('aria-label', "u");}    
                        }
                    if (SchiffsRichtung == 'senkrecht'){
                        if (fields[sf-1].getAttribute('aria-label') == "l") {
                            fields[sf-1].setAttribute('aria-label', "u");}
                        if (fields[sf+1].getAttribute('aria-label') == "l") {
                            fields[sf+1].setAttribute('aria-label', "u");}    
                        }    
                }  
                sf = SchiffsFelder[0];                  
                if (SchiffsRichtung == 'waagrecht'){
                    if (fields[sf-1].getAttribute('aria-label') == "v") {
                        fields[sf-1].setAttribute('aria-label', "u");
                        fields[sf-1].disabled=true;
                    }
                }                        
                if (SchiffsRichtung == 'senkrecht'){
                    if (fields[sf-11].getAttribute('aria-label') == "v") {
                        fields[sf-11].setAttribute('aria-label', "u");
                        fields[sf-11].disabled=true;
                    }
                }                
                sf = SchiffsFelder[SchiffsFelder.length-1];                  
                if (SchiffsRichtung == 'waagrecht'){
                    if (fields[sf+1].getAttribute('aria-label') == "v") {
                        fields[sf+1].setAttribute('aria-label', "u");
                        fields[sf+1].disabled=true;
                    }
                }
                if (SchiffsRichtung == 'senkrecht'){
                    if (sf < 110 &&  fields[sf+11].getAttribute('aria-label') == "v") {
                        fields[sf+11].setAttribute('aria-label', "u");
                        fields[sf+11].disabled=true;
                    }
                }  
                // jetzt werden alle mit 'l markierten Felder wieder freigegeben und mi "" gelabed 
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i].getAttribute('aria-label') == "l") {
                        fields[i].setAttribute('aria-label', "");
                        fields[i].disabled = false;
                    }
                }
                NumSchiffsFelder = 0; 
                SchiffsFelder = [];
                
                if (SchiffsIndex > 0) { SchiffsIndex--; 
                    hintH.innerText = 'Platziere jetzt Dein ' + SchiffeH[SchiffsIndex] + 'er Schiff';
                }
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