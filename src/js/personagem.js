function Personagem(processadorEventos) {
	this.processadorEventos = processadorEventos;
}

Personagem.prototype.setPosicaoInicial = function(linha, coluna) {
	this.posicao = new Posicao(linha, coluna);
	this.posicionarNaTela();
};

Personagem.prototype.posicionarNaTela = function() {
	$('.PERSONAGEM').css({
		top: this.posicao.linha * Constantes.ALTURA_CELULA + 'px',
		left: this.posicao.coluna * Constantes.LARGURA_CELULA + 'px'
	});
};

Personagem.prototype.andar = function(direcao, jogo) {
	var processadorEventos = this.processadorEventos;

	function gerarCallbackProcessarEvento(evento, posicao) {
		return function() {
			processadorEventos[evento] && processadorEventos[evento](posicao);
		};
	}

	for (;;) {
		var evento = jogo.tabuleiro.get(this.posicao.somar(direcao)).aoTentarPassar(direcao);

		if (evento == Evento.BLOQUEAR) {
			return;

		} else {
			this.posicao = this.posicao.somar(direcao);

			$('.PERSONAGEM').animate({
				top: this.posicao.linha * Constantes.ALTURA_CELULA + 'px',
				left: this.posicao.coluna * Constantes.LARGURA_CELULA + 'px'
			}, Constantes.TEMPO_UM_PASSO, 'linear', gerarCallbackProcessarEvento(evento, this.posicao));

			if (jogo.tabuleiro.get(this.posicao).emPassagem() == Evento.BLOQUEAR) {
				return;
			}
		}
	}
};
