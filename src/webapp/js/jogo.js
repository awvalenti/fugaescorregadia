function Jogo() {
	this.setPontos(0);
	this.iniciarFase(0);
}

Jogo.prototype.gerarProcessadorEventos = function() {
	var jogo = this;
	return {
		PEGAR_ITEM: function(posicao) {
			jogo.subirPontuacaoPorItem();
			jogo.tabuleiro.set(posicao, Elemento.NADA);
		},
		PASSAR_DE_FASE: function(posicao) {
			jogo.passarDeFase();
		}
	};
};

Jogo.prototype.passarDeFase = function() {
	alert('Passou!');
	this.iniciarFase(this.fase + 1);
};

Jogo.prototype.iniciarFase = function(fase) {
	this.fase = fase;

	if (fase >= $('#meta .fase').size()) {
		alert('Terminou!');
		$('body').fadeOut(1500);

	} else {
		this.tabuleiro = new Tabuleiro(Tela.numLinhas, Tela.numColunas, this.fase, this.gerarProcessadorEventos());

		var jogo = this;
		function redimensionar() {
			Plataforma.aoRedimensionar();

			Tela.larguraCelula = Tela.alturaCelula = Math.floor(Math.min($(window).width() / (Tela.numColunas + 2),
					($(window).height() - $('div#painel').height()) / (Tela.numLinhas + 2)));

			aplicarCssDinamico('#meta #css-dinamico');

			jogo.tabuleiro.personagem.posicionarNaTela();
		}
		redimensionar();
		$(window).unbind('resize').resize(redimensionar);

		Plataforma.tratarEntradaJogador(jogo);

		$('div#principal').fadeIn(1500, 'swing');

		$(window).focus();
	}
};

Jogo.prototype.executarComando = function(comando) {
	// TODO outros comandos, como reiniciar jogo, voltar para menu principal etc.
	var direcaoCorrespondente = Direcao[comando];
	this.tabuleiro.personagem.andar(direcaoCorrespondente, this);
};

Jogo.prototype.subirPontuacaoPorItem = function() {
	this.setPontos(this.pontos + 100);
};

Jogo.prototype.setPontos = function(pontos) {
	this.pontos = pontos;
	$('#pontos').text(pontos + ' ponto' + (pontos > 1 ? 's' : ''));
};
