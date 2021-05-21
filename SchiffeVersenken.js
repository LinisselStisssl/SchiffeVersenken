'use strict';
document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#gameboardHome')
		.addEventListener('click', markFieldH);
    document.querySelector('#NewGame')
		.addEventListener('click', ShowButton);
	document.querySelector('#NewGame')
		.addEventListener('click', NewGame);

        var SchiffeH = [2, 3 , 3 , 4 , 5 ];
        var verfügbareSchiffe = 5 ;

        
        function markFieldH(e) {
            var field = e.target;
            var Felder;
            while (verfügbareSchiffe > 0) 
            {hintH.innerText = 'Setzen sie jetzt Ihr ' + SchiffeH[verfügbareSchiffe-1] + 'er Schiff.';
                Felder=SchiffeH[verfügbareSchiffe-1];
                while (Felder > 1) {
                   field.setAttribute('aria-label', "y");
                   field.setAttribute('disabled', 'disabled');
                   field.setAttribute('value', 'S');  
                   Felder--;
                }
                verfügbareSchiffe--;
            } 
        }

        document.querySelector('#gameboardEnemy')
		.addEventListener('click', markFieldE);

        function markFieldE(e) {
            var field = e.target;
            field.setAttribute('aria-label', "o");
            field.setAttribute('disabled', 'disabled');
        }

        function ShowButton(divName){
            //Gibt es das Objekt mit dem Namen der in divName übergeben wurde?
            if(document.getElementById(divName)){
             /*"Sichtbarkeit" des Divs umschalten. 
             Wenn es sichtbar war, unsichtbar machen und umgedreht.*/
             document.getElementById(divName).style.display = 'inline';
            }
           }
        
        function NewGame(divName){
            location.reload();
        }
});