define([
  'prod/libs-originais/assert',
  'prod/aplicacao/model/Posicao'
],
function(
  assert,
  Posicao
) {
  'use strict';

  function RepoPosicoes() {
    this._cache = {};
  }

  RepoPosicoes.prototype.obter = function(linha, coluna) {
    assert.args(linha, 'number', coluna, 'number');

    if (!(linha in this._cache)) this._cache[linha] = {};
    if (!(coluna in this._cache[linha])) this._cache[linha][coluna] = new Posicao(linha, coluna, this);

    return this._cache[linha][coluna];
  };

  return RepoPosicoes;

});
