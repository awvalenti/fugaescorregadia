function Jogo() {
	this.setPontos(0);
	this.iniciarFase(0);
};

function gerarCallback(objeto, funcao) {
	return function() {
		funcao.apply(objeto, arguments);
	};
};

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
			Tela.larguraCelula = Tela.alturaCelula = Math.ceil(Math.min($(window).height()
					/ (Tela.numLinhas + 15), $(window).width() / (Tela.numColunas + 4)));

			aplicarCssDinamico('#meta #css-dinamico');

			jogo.tabuleiro.personagem.posicionarNaTela();
		}
		redimensionar();

		$('body').unbind('mousedown').mousedown(function(e) {
//			// Calculo por meio das diagonais
//			var linhaDiagonal1 = Math.round(Tela.numLinhas / Tela.numColunas * coluna);
//			var linhaDiagonal2 = Math.round(Tela.numLinhas - Tela.numLinhas / Tela.numColunas * coluna);
//
//			var direcao;
//			if (linha < linhaDiagonal1) {
//				if (linha < linhaDiagonal2) {
//					direcao = Comando.CIMA;
//				} else {
//					direcao = Comando.DIREITA;
//				}
//			} else {
//				if (linha < linhaDiagonal2) {
//					direcao = Comando.ESQUERDA;
//				} else {
//					direcao = Comando.BAIXO;
//				}
//			}
//
			var xClique = e.pageX;
			var yClique = e.pageY;

			var personagem = jogo.tabuleiro.personagem.$personagem;
			var offset = personagem.offset();
			var xCentroPersonagem = offset.left + personagem.width() / 2;
			var yCentroPersonagem = offset.top + personagem.height() / 2;

			if (Math.abs(yClique - yCentroPersonagem) < Math.abs(xClique - xCentroPersonagem)) {
				if (xClique < xCentroPersonagem) {
					direcao = Comando.ESQUERDA;
				} else {
					direcao = Comando.DIREITA;
				}
			} else {
				if (yClique < yCentroPersonagem) {
					direcao = Comando.CIMA;
				} else {
					direcao = Comando.BAIXO;
				}
			}

			jogo.executarComando(direcao);
		});
		$(window).unbind('resize').resize(redimensionar);
		$(document).unbind('keydown').keydown(gerarCallback(this, this.tratarTeclas));

		$('div#principal').fadeIn(1500, 'swing');

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
