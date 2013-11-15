define([
  'lib/non-amd/underscore',
  'assert'
],
function(
  _,
  assert
) {
  'use strict';

  function Fabrica() {
    this._cache = {};
  }

  Fabrica.prototype.criarPosicao = function(linha, coluna) {
    assert.args(linha, 'number', coluna, 'number');

    if (!(linha in this._cache)) this._cache[linha] = {};
    if (!(coluna in this._cache[linha])) this._cache[linha][coluna] = { linha: linha, coluna: coluna };

    return this._cache[linha][coluna];
  };

  return {
    criarFabrica: function() {
      return _(Fabrica.prototype.criarPosicao).bind(new Fabrica());
    }
  };

});
