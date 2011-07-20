function Jogo() {
	this.personagem = new Personagem();
	this.setPontos(0);
	this.setFase(0);
	this.ouvirTeclado();
};

Jogo.prototype.passarDeFase = function() {
	this.setFase(this.fase + 1);
};

Jogo.prototype.setFase = function(fase) {
	this.fase = fase;
	this.tabuleiro = new Tabuleiro(Constantes.NUM_LINHAS,
			Constantes.NUM_COLUNAS, this.fase, this.personagem, this.iniciar);
};

Jogo.prototype.iniciar = function() {
	$(window).focus();
};

Jogo.MAPA_TECLAS = {
	37: Direcao.ESQUERDA,  
	38: Direcao.CIMA,  
	39: Direcao.DIREITA,  
	40: Direcao.BAIXO 
};

Jogo.prototype.ouvirTeclado = function() {
	var jogoThis = this;

	$(document).unbind().keydown(function(e) {
		if (Jogo.MAPA_TECLAS[e.which]) {
			jogoThis.personagem.andar(Jogo.MAPA_TECLAS[e.which], jogoThis);
		}
	});
};

Jogo.prototype.subirPontuacaoPorItem = function() {
	this.setPontos(this.pontos + 100);
};

Jogo.prototype.setPontos = function(pontos) {
	this.pontos = pontos;
	$('#pontos').text(pontos + ' ponto' + (pontos > 1 ? 's' : ''));
};
