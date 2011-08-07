function Tabuleiro(nLinhas, nColunas, fase, processadorEventos) {
	this.matriz = [];
	this.nLinhas = nLinhas;
	this.nColunas = nColunas;

	var divPrincipal = $('div#principal').hide().empty();

	function acrescentarElemento(el) {
		var divElemento =
			$('<div>')
				.addClass('celula')
				.addClass(el.nome)
				.data('elemento', el);
		return divElemento.appendTo(divPrincipal);
	}

	var stringFase = $('#meta .fase').eq(fase).text().replace(/\s+/g, '');
	var tamanhoStringFase = stringFase.length;
	var tamanhoEsperado = this.nLinhas * this.nColunas;
	if (tamanhoStringFase != tamanhoEsperado && OpcoesGlobais.rejeitarFaseTamanhoIncorreto) {
		throw 'Tamanho da matriz inesperado: ' + tamanhoStringFase + '. Esperado: ' + tamanhoEsperado;
	}

	con.debug('Criando elementos...');
	var mapaSohUmPorFase = {};
	var indice = 0;
	for (var linha = 0; linha < this.nLinhas; ++linha) {
		this.matriz[linha] = [];
		for (var coluna = 0; coluna < this.nColunas; ++coluna, ++indice) {
			var caractereElemento = stringFase.charAt(indice);
			var elemento = MAPA_CONSTRUCAO_FASE[caractereElemento];

			if (!elemento) {
				if (OpcoesGlobais.rejeitarFaseTamanhoIncorreto) {
					throw "Caractere nao reconhecido: '" + caractereElemento + "'";
				} else {
					elemento = Elemento.NADA;
				}
			}

			if (elemento.sohUmPorFase) {
				if (mapaSohUmPorFase[elemento]) {
					throw elemento + ' ja definido em ' + mapaSohUmPorFase[elemento];
				}
				mapaSohUmPorFase[elemento] = Posicao(linha, coluna);
			}

			switch (elemento) {
			case Elemento.PERSONAGEM:
				this.personagem = new Personagem(linha, coluna, processadorEventos);
				this.matriz[linha][coluna] = acrescentarElemento(Elemento.NADA);
				break;
			default:
				this.matriz[linha][coluna] = acrescentarElemento(elemento);
			}
		}
	}

	this.personagem.setElementoHtml(acrescentarElemento(Elemento.PERSONAGEM));
	con.debug('Criou.');
}

Tabuleiro.prototype.setAux = function(linha, coluna, novoElemento) {
	var divElemento = this.matriz[linha][coluna];
	var elementoAntigo = divElemento.data('elemento');

	divElemento
		.removeClass(elementoAntigo.nome)
		.addClass(novoElemento.nome)
		.data('elemento', novoElemento);
};

Tabuleiro.prototype.set = function(posicao, objeto) {
	this.setAux(posicao.linha, posicao.coluna, objeto);
};

Tabuleiro.prototype.get = function(posicao) {
	if (posicao.linha < 0 || posicao.coluna < 0 || posicao.linha >= this.nLinhas || posicao.coluna >= this.nColunas) {
		return Elemento.OBSTACULO;
	} else {
		return this.matriz[posicao.linha][posicao.coluna].data('elemento');
	}
};
