function Jogo() {
	this.personagem = new Personagem(this.tratadorEventos());
	this.setPontos(0);
	this.iniciarFase(0);
};

function gerarCallback(objeto, funcao) {
	return function() {
		funcao.apply(objeto, arguments);
	};
};

Jogo.prototype.tratadorEventos = function() {
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
		this.tabuleiro = new Tabuleiro(Constantes.NUM_LINHAS, Constantes.NUM_COLUNAS, this.fase, this.personagem);

		var jogo = this;
		function redimensionar() {
			Constantes.LARGURA_CELULA = Constantes.ALTURA_CELULA = Math.ceil(Math.min($(window).height()
					/ (Constantes.NUM_LINHAS + 4), $(window).width() / (Constantes.NUM_COLUNAS + 3)));

			aplicarCssDinamico('#meta #css-dinamico');

			jogo.personagem.posicionarNaTela();
		}
		redimensionar();

		$('div#principal').fadeIn(1500, 'swing');

		$(window).unbind('resize').resize(redimensionar);
		$(document).unbind('keydown').keydown(gerarCallback(this, this.tratarTeclas));
		$('div#botoes button').unbind('click').click(function() {
			jogo.executarComando(Comando[$(this).val()]);
		});

		$(window).focus();
	}
};

Jogo.prototype.tratarTeclas = function(e) {
	var teclasComandos = {
		37: Comando.ESQUERDA,
		38: Comando.CIMA,
		39: Comando.DIREITA,
		40: Comando.BAIXO
	};

	teclasComandos[e.which] && this.executarComando(teclasComandos[e.which]);
};

Jogo.prototype.executarComando = function(comando) {
	var direcaoCoresspondente = Direcao[comando];
	this.personagem.andar(direcaoCoresspondente, this);
};

Jogo.prototype.subirPontuacaoPorItem = function() {
	this.setPontos(this.pontos + 100);
};

Jogo.prototype.setPontos = function(pontos) {
	this.pontos = pontos;
	$('#pontos').text(pontos + ' ponto' + (pontos > 1 ? 's' : ''));
};
