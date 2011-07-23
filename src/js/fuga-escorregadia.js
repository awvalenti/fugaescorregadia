$(function() {
	Constantes.LARGURA_CELULA = Constantes.ALTURA_CELULA = Math.ceil(Math.min($(window).height()
			/ (Constantes.NUM_LINHAS + 4), $(window).width() / (Constantes.NUM_COLUNAS + 3)));
	new Jogo();
});
