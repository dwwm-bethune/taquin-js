// Permet de déplacer un bloc
function moveBloc(bloc) {
    // this représente bien le bloc qui est cliqué
    // On récupère la position (top, left) du bloc cliqué
    var blocX = $(bloc).position().left;
    var blocY = $(bloc).position().top;

    // Récupère la position du bloc vide
    var emptyX = $('.bloc-empty').position().left;
    var emptyY = $('.bloc-empty').position().top;

    // Inverser la position des blocs
    $(bloc).css({ top: emptyY, left: emptyX });
    $('.bloc-empty').css({ top: blocY, left: blocX });

    // Intervertir les ids pour connaitre la position d'un bloc
    // et vérifier si on a gagné la partie
    var currentId = $(bloc).attr('id');
    var emptyId = $('.bloc-empty').attr('id');
    $(bloc).attr('id', emptyId);
    $('.bloc-empty').attr('id', currentId);
}

$('#start').click(function () {
    var shots = 0; // Représente le nombre de coups

    // On mélange le jeu avant de commencer
    for (var i = 1; i < 50; i++) {
        var random = Math.floor(Math.random() * 15) + 1; // Nombre entre 1 et 15
        moveBloc('#bloc-'+random);
    }

    // On change le texte du bouton
    $('#start').text('Rejouer');
    $('#win').hide();

    // Chronomètre
    var milliseconds = 0;

    var stopwatch = setInterval(function () {
        milliseconds += 0.01 * 100;
        $('#stopwatch strong').text(milliseconds / 100);
    }, 10);

    // Quand on clique sur une case .bloc
    $('.bloc').click(function () {
        // this représente bien le bloc qui est cliqué
        // On récupère la position (top, left) du bloc cliqué
        var blocX = $(this).position().left;
        var blocY = $(this).position().top;

        // Récupère la position du bloc vide
        var emptyX = $('.bloc-empty').position().left;
        var emptyY = $('.bloc-empty').position().top;

        // Debug de la position des blocs
        console.log('bloc: ' + blocX, blocY);
        console.log('empty: ' + emptyX, emptyY);

        // Calculer la différence de position entre les blocs
        var diffX = Math.abs(blocX - emptyX); // -100 devient 100 et 100 devient 100
        var diffY = Math.abs(blocY - emptyY);

        console.log('diff: ' + diffX, diffY);

        // On empêche le déplacement de plus de 2 blocs d'écarts (Logique 1)
        // Et on empêche la diagonale
        if (diffX > 100 || diffY > 100 || diffX >= 100 && diffY >= 100) {
            // return; // On arrête le code donc on ne bouge pas le bloc
        }

        // On peut aussi s'assurer de faire le déplacement seulement s'il est correct (Logique 2)
        // if (diffX <= 100 && diffY == 0 || diffY <= 100 && diffX == 0) {
            // Inverser la position des blocs
            $(this).css({ top: emptyY, left: emptyX });
            $('.bloc-empty').css({ top: blocY, left: blocX });

            // Incrémenteur le compteur du jeu
            shots++;
            $('#shots strong').text(shots);

            // Intervertir les ids pour connaitre la position d'un bloc
            // et vérifier si on a gagné la partie
            var currentId = $(this).attr('id');
            var emptyId = $('.bloc-empty').attr('id');
            $(this).attr('id', emptyId);
            $('.bloc-empty').attr('id', currentId);

            // Vérifier si on a gagné
            var win = true;
            for (var i = 1; i < 16; i++) {
                // class="bloc-i" id="bloc-i"
                var blocId = $('.bloc-'+i).attr('id');

                if (blocId != 'bloc-'+i) {
                    // On perd si l'id ne correspond pas au bloc
                    win = false;
                }
            }

            if (win) {
                $('#win').show(); // On affiche une div quand on gagne
                clearInterval(stopwatch); // Arrêt du chronomètre
                $('.bloc').off('click'); // Désactive l'événement sur le clic
            }
        // }
    });
});
