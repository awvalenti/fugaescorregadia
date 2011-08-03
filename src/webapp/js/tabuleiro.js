function Tabuleiro(nLinhas, nColunas, fase, personagem) {
	this.matriz = [];
	this.nLinhas = nLinhas;
	this.nColunas = nColunas;

	function criarElemento(elemento) {
		return $('<div>')
			.data('elemento', elemento.nome)
			.addClass('celula ' + elemento.nome);
	}

	var divPrincipal = $('div#principal').hide().empty();

	for (var linha = 0; linha < this.nLinhas; ++linha) {
		for (var coluna = 0; coluna < this.nColunas; ++coluna) {
			divPrincipal.append(criarElemento(Elemento.NADA).addClass('linha' + linha + ' coluna' + coluna));
		}
	}

	divPrincipal.append(criarElemento(Elemento.PERSONAGEM));

	var stringFase = $('#meta .fase').eq(fase).text().replace(/\s+/g, '');
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

			if (elemento.sohUmPorFase) {
				if (mapaSohUmPorFase[elemento]) {
					throw elemento + ' ja definido em ' + mapaSohUmPorFase[elemento];
				}
				mapaSohUmPorFase[elemento] = Posicao(linha, coluna);
			}

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
}

Tabuleiro.prototype.setAux = function(linha, coluna, elemento) {
	this.matriz[linha][coluna] = elemento;
	var divElemento = $('.linha' + linha + '.coluna' + coluna);
	divElemento
		.removeClass(divElemento.data('elemento'))
		.data('elemento', elemento.nome)
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
