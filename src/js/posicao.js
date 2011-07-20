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
