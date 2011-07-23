function Tabuleiro(nLinhas, nColunas, fase, personagem, readyCallback) {
	function criarElemento(elemento) {
		return $('<div elemento="' + elemento.nome + '" class="celula ' + elemento.nome + '">')		.css({
			'width': Constantes.LARGURA_CELULA + 'px',
			'height': Constantes.ALTURA_CELULA + 'px'
		});
	}
	
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
			divPrincipal.append(
					criarElemento(Elemento.NADA)
						.addClass('linha' + linha + ' coluna' + coluna)
						.css({
							'top': linha * Constantes.ALTURA_CELULA + 'px',
							'left': coluna * Constantes.LARGURA_CELULA + 'px'
						})
					);
		}
	}
	
	divPrincipal.append(criarElemento(Elemento.PERSONAGEM));
	
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
	
	$('#principal').fadeIn(1000, null, readyCallback);
}

Tabuleiro.prototype.setAux = function(linha, coluna, elemento) {
	this.matriz[linha][coluna] = elemento;
	$('.linha' + linha + '.coluna' + coluna)
		.removeClass($('.linha' + linha + '.coluna' + coluna).attr('elemento'))
		.attr('elemento', elemento.nome)
		.addClass(elemento.nome);
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
