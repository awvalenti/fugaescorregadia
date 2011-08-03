Posicao = (function() {
	function PosicaoUnica(linha, coluna) {
		this.linha = linha;
		this.coluna = coluna;
	}

	PosicaoUnica.prototype.toString = function() {
		return '(' + this.linha + ', ' + this.coluna + ')';
	};

	PosicaoUnica.prototype.somar = function(outra) {
		return Posicao(this.linha + outra.linha, this.coluna + outra.coluna);
	};

	PosicaoUnica.prototype.cache = [];

	return function(linha, coluna) {
		var cache = PosicaoUnica.prototype.cache;
		cache[linha] || (cache[linha] = []);
		return cache[linha][coluna] || (cache[linha][coluna] = new PosicaoUnica(linha, coluna));
	};

})();
