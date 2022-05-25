// Quand on clique sur une case .bloc
$('.bloc').click(function () {
    // this représente bien le bloc qui est cliqué
    // On récupère la position (top, left) du bloc cliqué
    var blocX = $(this).position().left;
    var blocY = $(this).position().top;

    // Récupère la position du bloc vide
    var emptyX = $('.bloc-empty').position().left;
    var emptyY = $('.bloc-empty').position().top;

    // Inverser la position des blocs
    $(this).css({ top: emptyY, left: emptyX });
    $('.bloc-empty').css({ top: blocY, left: blocX });
});
