function Jogo() {
	this.setPontos(0);
	this.iniciarFase(0);
}

function gerarCallback(objeto, funcao) {
	return function() {
		return funcao.apply(objeto, arguments);
	};
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
			Tela.larguraCelula = Tela.alturaCelula = Math.floor(Math.min($(window).width() / (Tela.numColunas + 2),
					($(window).height() - $('div#painel').height()) / (Tela.numLinhas + 2)));

			aplicarCssDinamico('#meta #css-dinamico');

			jogo.tabuleiro.personagem.posicionarNaTela();
		}
		redimensionar();

		var toqueInicial = {};
		document.addEventListener('touchstart', function(e) {
			e.preventDefault();

			var toque = e.touches[0];
			toqueInicial.x = toque.pageX;
			toqueInicial.y = toque.pageY;
		});
		document.addEventListener('touchmove', function(e) {

			var toque = e.touches[0];

			var difX = toque.pageX - toqueInicial.x;
			var difY = toque.pageY - toqueInicial.y;

			var absDifX = Math.abs(difX);
			var absDifY = Math.abs(difY);

			if (Math.max(absDifX, absDifY) >= Constantes.SENSIBILIDADE_MOVIMENTO) {
				var direcao;
				if (absDifX > absDifY) {
					if (difX < 0) {
						direcao = Comando.ESQUERDA;
					} else {
						direcao = Comando.DIREITA;
					}
				} else {
					if (difY < 0) {
						direcao = Comando.CIMA;
					} else  {
						direcao = Comando.BAIXO;
					}
				}

				jogo.executarComando(direcao);

				toqueInicial.x = toque.pageX;
				toqueInicial.y = toque.pageY;
			}
		});

		$(window).unbind('resize').resize(redimensionar);

		// Ao pressionar uma tecla, primeiro e' gerado um evento
		// keydown, depois e' gerado um evento keypress. O tratamento
		// e' feito no evento keydown. No keypress, somente anulamos
		// o efeito da tecla, para evitar que o navegador role a tela.
		$(document).unbind('keydown').keydown(gerarCallback(this, this.tratarTecla));
		$(document).unbind('keypress').keypress(gerarCallback(this, this.anularTecla));

		$('div#principal').fadeIn(1500, 'swing');

		$(window).focus();
	}
};

Jogo.prototype.tratarTecla = function(e) {
	var teclasComandos = {
		// PC
		37: Comando.ESQUERDA,
		38: Comando.CIMA,
		39: Comando.DIREITA,
		40: Comando.BAIXO,

		// Wii
		178: Comando.ESQUERDA,
		175: Comando.CIMA,
		177: Comando.DIREITA,
		176: Comando.BAIXO
	};

	if (teclasComandos[e.which]) {
		this.executarComando(teclasComandos[e.which]);
		this.anularEventoKeyPress = true;

		// Anula acoes do navegador (necessario para IE/Safari; uma das opcoes para FF/Opera)
		return false;
	} else {
		this.anularEventoKeyPress = false;
	}
};

Jogo.prototype.anularTecla = function(e) {
	if (this.anularEventoKeyPress) {
		// Anula acoes do navegador (necessario para Wii; uma das opcoes para FF/Opera)
		return false;
	}
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
