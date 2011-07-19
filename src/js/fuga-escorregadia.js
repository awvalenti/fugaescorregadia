///////////////////////////////////////////////

$(iniciar);

///////////////////////////////////////////////
Constantes = {
	LARGURA_CELULA: 30,
	ALTURA_CELULA: 30,
	
	TEMPO_UM_PASSO: 30
};

function Enum(listaDeConstantes) {
	for (var i in listaDeConstantes) {
		this[listaDeConstantes[i]] = i;
	}
}

Evento = new Enum(['CONTINUAR_ANDANDO', 'BLOQUEAR', 'PEGAR_ITEM', 'PASSAR_DE_FASE']);

Elemento = {
	NADA: {
		caractere: '_',
		aoTentarPassar: function() { return Evento.CONTINUAR_ANDANDO; },
		emPassagem: function() { return Evento.CONTINUAR_ANDANDO; }
	},
	OBSTACULO: {
		caractere: 'o',
		aoTentarPassar: function() { return Evento.BLOQUEAR; }
	},
	SETA_ESQUERDA: {
		caractere: '[',
		aoTentarPassar: function(direcao) { return direcao == Direcao.ESQUERDA ? Evento.CONTINUAR_ANDANDO : Evento.BLOQUEAR; },
		emPassagem: function() { return Evento.CONTINUAR_ANDANDO; }
	},
	SETA_CIMA: {
		caractere: '^',
		aoTentarPassar: function(direcao) { return direcao == Direcao.CIMA ? Evento.CONTINUAR_ANDANDO : Evento.BLOQUEAR; },
		emPassagem: function() { return Evento.CONTINUAR_ANDANDO; }
	},
	SETA_DIREITA: {
		caractere: ']',
		aoTentarPassar: function(direcao) { return direcao == Direcao.DIREITA ? Evento.CONTINUAR_ANDANDO : Evento.BLOQUEAR; },
		emPassagem: function() { return Evento.CONTINUAR_ANDANDO; }
	},
	SETA_BAIXO: {
		caractere: 'v',
		aoTentarPassar: function(direcao) { return direcao == Direcao.BAIXO ? Evento.CONTINUAR_ANDANDO : Evento.BLOQUEAR; },
		emPassagem: function() { return Evento.CONTINUAR_ANDANDO; }
	},
	COLA: {
		caractere: 'c',
		aoTentarPassar: function() { return Evento.CONTINUAR_ANDANDO; },
		emPassagem: function() { return Evento.BLOQUEAR; }
	},
	ITEM: {
		caractere: 'i',
		aoTentarPassar: function() { return Evento.PEGAR_ITEM; },
		emPassagem: function() { return Evento.CONTINUAR_ANDANDO; }
	},
	PERSONAGEM: {
		caractere: 'p',
		sohUmPorFase: true
	},
	SAIDA: {
		caractere: 's',
		aoTentarPassar: function() { return Evento.PASSAR_DE_FASE; },
		emPassagem: function() { return Evento.BLOQUEAR; },
		sohUmPorFase: true
	}
};

MAPA_CONSTRUCAO_FASE = {};

(function() {
	for (var nomeElemento in Elemento) {
		var elemento = Elemento[nomeElemento];
		elemento.nome = nomeElemento;
		elemento.toString = function() { return this.nome; };
		MAPA_CONSTRUCAO_FASE[elemento.caractere] = elemento;
	}
})();

///////////////////////////////////////////////
Direcao = {
	ESQUERDA: new Posicao(0, -1),
	CIMA: new Posicao(-1, 0),
	DIREITA: new Posicao(0, +1),
	BAIXO: new Posicao(+1, 0)
};

function Posicao(linha, coluna) {
	this.linha = linha;
	this.coluna = coluna;
}

Posicao.prototype.toString = function() {
	return '(' + this.linha + ', ' + this.coluna + ')';
};

Posicao.prototype.somar = function(outra) {
	return new Posicao(this.linha + outra.linha, this.coluna + outra.coluna);
};

function Personagem() {
}

Personagem.prototype.setPosicaoInicial = function(linha, coluna) {
	this.posicao = new Posicao(linha, coluna);
	$('[elemento="PERSONAGEM"]')
		.css({
			top: this.posicao.linha * Constantes.ALTURA_CELULA + 'px',
			left: this.posicao.coluna * Constantes.LARGURA_CELULA + 'px'
		});
};

Personagem.prototype.andar = function(direcao, jogo) {
	var filaEventos = [];
	
	for (;;) {
	
		var eventoAoTentarPassar = jogo.tabuleiro.get(this.posicao.somar(direcao)).aoTentarPassar(direcao);
		
		if (eventoAoTentarPassar == Evento.BLOQUEAR) {
			break;
		}
		
		// Atualiza posicao
		this.posicao = this.posicao.somar(direcao);
		
		// Prepara fila de eventos para processar
		filaEventos.push({ qual: eventoAoTentarPassar, posicao: this.posicao });
		
		$('[elemento="PERSONAGEM"]')
			.animate({
				top: this.posicao.linha * Constantes.ALTURA_CELULA + 'px',
				left: this.posicao.coluna * Constantes.LARGURA_CELULA + 'px'
			}, Constantes.TEMPO_UM_PASSO, 'linear', function() {
				var evento = filaEventos.shift(); 
				
				switch (evento.qual) {
				case Evento.PEGAR_ITEM:
					jogo.subirPontuacaoPorItem();
					jogo.tabuleiro.set(evento.posicao, Elemento.NADA);
					break;
				case Evento.PASSAR_DE_FASE:
					alert('Passou!');
					jogo.passarDeFase();
				}
			});
		
		if (jogo.tabuleiro.get(this.posicao).emPassagem() == Evento.BLOQUEAR) {
			break;
		}
	}
};
///////////////////////////////////////////////
function Tabuleiro(nLinhas, nColunas, fase, personagem) {
	this.matriz = [];
	this.nLinhas = nLinhas;
	this.nColunas = nColunas;

	var divPrincipal = $('#principal')
		.hide()
		.empty()
		.css('width', Constantes.LARGURA_CELULA * this.nColunas + 'px')
		.css('height', Constantes.ALTURA_CELULA * this.nLinhas + 'px');

	for (var linha = 0; linha < this.nLinhas; ++linha) {
		for (var coluna = 0; coluna < this.nColunas; ++coluna) {
			var novaDiv = $('<div elemento="NADA"' + ' class="celula linha'
					+ linha + ' coluna' + coluna + '">')
				.css({
					'top': linha * Constantes.ALTURA_CELULA + 'px',
					'left': coluna * Constantes.LARGURA_CELULA + 'px',
					'width': Constantes.LARGURA_CELULA + 'px',
					'height': Constantes.ALTURA_CELULA + 'px'
				});
			divPrincipal.append(novaDiv);
		}
	}
	
	divPrincipal.append($('<div elemento="PERSONAGEM">')
		.css({
			'width': Constantes.LARGURA_CELULA + 'px',
			'height': Constantes.ALTURA_CELULA + 'px'
		}));
	
	var stringFase = $('.fase').eq(fase).html().replace(/\s+/g, '');
	
	var tamanhoStringFase = stringFase.length;
	var tamanhoEsperado = this.nLinhas * this.nColunas;
	if (tamanhoStringFase != tamanhoEsperado) {
		throw 'Tamanho da matriz inesperado: ' + tamanhoStringFase + '. Esperado: ' + tamanhoEsperado;
	}

	var mapaSohUmPorFase = {};
	var indice = 0;
	for (var linha = 0; linha < this.nLinhas; ++linha) {
		this.matriz[linha] = [];
		
		for (var coluna = 0; coluna < this.nColunas; ++coluna, ++indice) {
			var caractereElemento = stringFase.charAt(indice);
			var elemento = MAPA_CONSTRUCAO_FASE[caractereElemento];
			
			if (!elemento) {
				throw "Caractere nao reconhecido: '" + caractereElemento + "'";
			}
			if (elemento.sohUmPorFase && mapaSohUmPorFase[elemento]) {
				throw elemento + ' ja definido em ' + mapaSohUmPorFase[elemento];
			}
			
			mapaSohUmPorFase[elemento] = new Posicao(linha, coluna);
			
			switch (elemento) {
			case Elemento.PERSONAGEM:
				personagem.setPosicaoInicial(linha, coluna);
				this.setAux(linha, coluna, Elemento.NADA);
				break;
			default:
				this.setAux(linha, coluna, elemento);
			}
		}
	}
	
	$('#principal').fadeToggle(1000);
}

Tabuleiro.prototype.setAux = function(linha, coluna, elemento) {
	this.matriz[linha][coluna] = elemento;
	$('.linha' + linha + '.coluna' + coluna)
		.attr('elemento', elemento.nome);
};

Tabuleiro.prototype.set = function(posicao, objeto) {
	this.setAux(posicao.linha, posicao.coluna, objeto);
};

Tabuleiro.prototype.get = function(posicao) {
	if (posicao.linha < 0 || posicao.coluna < 0 || posicao.linha >= this.nLinhas || posicao.coluna >= this.nColunas) {
		return Elemento.OBSTACULO;
	} else {
		return this.matriz[posicao.linha][posicao.coluna];
	}
};

///////////////////////////////////////////////
function Jogo() {
	this.personagem = new Personagem();
	this.setPontos(0);
	this.setFase(0);
};

Jogo.prototype.passarDeFase = function() {
	this.setFase(this.fase + 1);
};

Jogo.prototype.setFase = function(fase) {
	this.fase = fase;
	this.tabuleiro = new Tabuleiro(12, 16, this.fase, this.personagem);
};

Jogo.prototype.ouvirTeclado = function() {
	MAPA_TECLAS = {
		37: Direcao.ESQUERDA,  
		38: Direcao.CIMA,  
		39: Direcao.DIREITA,  
		40: Direcao.BAIXO 
	};

	var jogoThis = this;

	$(document).unbind().keydown(function(e) {
		if (MAPA_TECLAS[e.which]) {
			jogoThis.personagem.andar(MAPA_TECLAS[e.which], jogoThis);
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

Jogo.prototype.iniciar = function() {
	this.ouvirTeclado();
};

///////////////////

function iniciar() {
//	Constantes.LARGURA_CELULA = Constantes.ALTURA_CELULA = $(document).height() / 12;
	var jogo = new Jogo();
	jogo.iniciar();
};

