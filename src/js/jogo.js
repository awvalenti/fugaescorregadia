function gerarCallback(objeto, funcao) {
	return function() {
		funcao.apply(objeto, arguments);
	};
};

function Jogo() {
	this.personagem = new Personagem(this.tratadorEventos());
	this.setPontos(0);
	this.setFase(0);
};

Jogo.prototype.tratadorEventos = function() {
	var jogo = this;
	return {
		PEGAR_ITEM: function(posicao) {
			jogo.subirPontuacaoPorItem();
			jogo.tabuleiro.set(posicao, Elemento.NADA);
		},
		PASSAR_DE_FASE: function(posicao) {
			alert('Passou!');
			jogo.passarDeFase();
		}
	};
};

Jogo.prototype.passarDeFase = function() {
	this.setFase(this.fase + 1);
};

Jogo.prototype.setFase = function(fase) {
	this.fase = fase;
	this.tabuleiro = new Tabuleiro(Constantes.NUM_LINHAS, Constantes.NUM_COLUNAS, this.fase, this.personagem,
			gerarCallback(this, this.iniciar));
};

Jogo.prototype.iniciar = function() {
	$(window).focus();
	this.ouvirTeclado();
};

Jogo.MAPA_TECLAS = {
	37: Direcao.ESQUERDA,
	38: Direcao.CIMA,
	39: Direcao.DIREITA,
	40: Direcao.BAIXO
};

Jogo.prototype.ouvirTeclado = function() {
	$(document).unbind().keydown(gerarCallback(this, this.tratarTeclas));
};

Jogo.prototype.tratarTeclas = function(e) {
	if (Jogo.MAPA_TECLAS[e.which]) {
		this.personagem.andar(Jogo.MAPA_TECLAS[e.which], this);
	}
};

Jogo.prototype.subirPontuacaoPorItem = function() {
	this.setPontos(this.pontos + 100);
};

Jogo.prototype.setPontos = function(pontos) {
	this.pontos = pontos;
	$('#pontos').text(pontos + ' ponto' + (pontos > 1 ? 's' : ''));
};
