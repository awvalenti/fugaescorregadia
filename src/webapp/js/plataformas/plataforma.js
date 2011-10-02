(function() {
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

	var todasAsPlataformas = {
		ios: {
			aoIniciar: function() {
				$('head')
						.append(
								'<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />')
						.append('<meta name="apple-mobile-web-app-capable" content="yes" />');

				$('body').append('<p style="height: 2000px; visibility: hidden">asdf</p>');

				Constantes.SENSIBILIDADE_MOVIMENTO = 30;
			},

			aoRedimensionar: function() {
				setTimeout(function() {
					window.scrollTo(0, 0);
				}, 0);
			},

			tratarEntradaJogador: function(jogo) {
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
			},
		},

		// ----------------------------------------------------------------

		pc_wii: {
			aoIniciar: $.noop,

			aoRedimensionar: $.noop,

			tratarEntradaJogador: function(jogo) {
				function tratarTecla(e) {
					if (teclasComandos[e.which]) {
						// Existe mapeamento da tecla pressionada para uma acao no jogo

						jogo.executarComando(teclasComandos[e.which]);
						jogo.anularEventoKeyPress = true;

						// Anula acoes do navegador (necessario para IE/Safari; uma das opcoes para FF/Opera)
						return false;

					} else {
						// Tecla pressionada nao mapeia para nenhuma acao no jogo
						jogo.anularEventoKeyPress = false;
					}
				};

				function anularTecla(e) {
					if (jogo.anularEventoKeyPress) {
						// Anula acoes do navegador (necessario para Wii; uma das opcoes para FF/Opera)
						return false;
					}
				};

				// Ao pressionar uma tecla, primeiro e' gerado um evento
				// keydown, depois e' gerado um evento keypress. O tratamento
				// e' feito no evento keydown. No keypress, somente anulamos
				// o efeito da tecla, para evitar que o navegador role a tela.
				$(document).unbind('keydown').keydown(tratarTecla);
				$(document).unbind('keypress').keypress(anularTecla);
			}
		},
	};


	function detectarPlataforma() {

		var mapaUserAgents = {
			ios: ['ipod', 'iphone', 'ipad'],
		};

		function buscarNomePlataforma(userAgent) {
			for (var nomePlataforma in mapaUserAgents) {
				var userAgents = mapaUserAgents[nomePlataforma];

				for (var i = 0; i < userAgents.length; ++i) {
					if (userAgent.indexOf(userAgents[i]) != -1) {
						return nomePlataforma;
					}
				}

				// Plataforma padrao
				return 'pc_wii';
			}
		}

		return todasAsPlataformas[buscarNomePlataforma(navigator.userAgent.toLowerCase())];
	};

	Plataforma = detectarPlataforma();

})();
