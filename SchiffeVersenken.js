'use strict';
document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#gameboardHome')
		.addEventListener('click', markFieldH);

        function markFieldH(e) {
            var field = e.target;
            field.setAttribute('aria-label', "y");
            field.setAttribute('disabled', 'disabled');
            current = 1 - current;
            hint.innerText = 'Spieler ' + players[current] + ' ist am Zug.';
            checkIfCompleted();
        }

        document.querySelector('#gameboardEnemy')
		.addEventListener('click', markFieldE);

        function markFieldE(e) {
            var field = e.target;
            field.setAttribute('aria-label', "o");
            field.setAttribute('disabled', 'disabled');
        }


});