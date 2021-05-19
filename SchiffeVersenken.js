'use strict';
document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#gameboardHome')
		.addEventListener('click', markFieldH);
    document.querySelector('#NewGame')
		.addEventListener('click', ShowButton);
	document.querySelector('#NewGame')
		.addEventListener('click', NewGame);

        var SchiffeH = [2, 3 , 3 , 4 , 5 ];
        var current = 5 ;

        function checkShipsPlaced() {
            var fields = document.querySelectorAll('#gameboardHome button'), // fields ist die Liste unserer Felder
                placed = true; // wir gehen davon aus, dass alle Zellen benutzt wurden
            // alle Felder markiert?
            for (var i = 0; i < SchiffeH.length; i++) {
                if (!SchiffeH[i].hasAttribute('disabled')) {
                    placed = false;
                }
            }
        }
        function markFieldH(e) {
            var field = e.target;
            field.setAttribute('aria-label', "y");
            field.setAttribute('disabled', 'disabled');
            checkShipsPlaced();
        }

        function SchiffeSetzen(e) {
            var field = e.target;
            field.setAttribute('aria-label', "y");
            field.setAttribute('disabled', 'disabled');
            if (current > 0) 
               {hintH.innerText = 'Setzen sie jetzt Ihr ' + SchiffeH[current] + 'er Schiff.';
                current = current-1;
                } 
        }


        function markFieldH(e) {
            var field = e.target;
            field.setAttribute('aria-label', "y");
            field.setAttribute('disabled', 'disabled');
            field.setAttribute('value', 'S');
            if (current > 0) 
               {hintH.innerText = 'Setzen sie jetzt Ihr' + SchiffeH[current] + ' Schiff.';
                current = current-1;
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