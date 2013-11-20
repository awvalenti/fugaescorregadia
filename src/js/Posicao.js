define([
  'lib/non-amd/underscore',
  'assert'
],
function(
  _,
  assert
) {
  'use strict';

  function Posicao(linha, coluna, fabrica) {
    this._linha = linha;
    this._coluna = coluna;
    this._fabrica = fabrica;

    this._tornarPropriedadeFabricaNaoEnumeravel();
  }

  Posicao.prototype.somar = function(direcao) {
    return this._fabrica.criarPosicao(this._linha + direcao.linha, this._coluna + direcao.coluna);
  };

  Posicao.prototype.estaContidaEm = function(quantidadeLinhas, quantidadeColunas) {
    return this._linha >= 0 && this._linha < quantidadeLinhas && this._coluna >= 0 && this._coluna < quantidadeColunas;
  };

  Posicao.prototype._tornarPropriedadeFabricaNaoEnumeravel = function() {
    // Isto serve para evitar mensagens de erro gigantes nas specs. O certo seria simplesmente sobrepor toString, mas nao funcionou.

    if (typeof Object !== 'undefined' && typeof Object.defineProperty === 'function') {
      Object.defineProperty(this, '_fabrica', { value: this._fabrica, enumerable: false });
    }
  };

  // --------------------------------------------------------------------------

  function Fabrica() {
    this._cache = {};
  }

  Fabrica.prototype.criarPosicao = function(linha, coluna) {
    assert.args(linha, 'number', coluna, 'number');

    if (!(linha in this._cache)) this._cache[linha] = {};
    if (!(coluna in this._cache[linha])) this._cache[linha][coluna] = new Posicao(linha, coluna, this);

    return this._cache[linha][coluna];
  };

  return {
    criarFabrica: function() {
      return _(Fabrica.prototype.criarPosicao).bind(new Fabrica());
    }
  };

});
