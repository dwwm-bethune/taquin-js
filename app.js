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
    if (diffX <= 100 && diffY == 0 || diffY <= 100 && diffX == 0) {
        // Inverser la position des blocs
        $(this).css({ top: emptyY, left: emptyX });
        $('.bloc-empty').css({ top: blocY, left: blocX });
    }
});
