$(function() {
	Constantes.LARGURA_CELULA = Constantes.ALTURA_CELULA = Math.ceil($(window).height() / (Constantes.NUM_LINHAS + 4));
	new Jogo();
});
