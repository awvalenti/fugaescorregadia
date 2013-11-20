define([
  'assert'
],
function(
  assert
) {
  'use strict';

  function Movimentacao(quantidadeLinhas, quantidadeColunas) {
    assert.args(quantidadeLinhas, 'number', quantidadeColunas, 'number');

    this._quantidadeLinhas = quantidadeLinhas;
    this._quantidadeColunas = quantidadeColunas;
  }

  Movimentacao.prototype.movimentarPersonagem = function(posicaoPersonagem, direcao, temObstaculoEm) {
    if (typeof temObstaculoEm === 'undefined') temObstaculoEm = function(posicao) { return false; };

    for (;;) {
      var novaPosicao = posicaoPersonagem.somar(direcao);

      if (!novaPosicao.estaDentroDosLimites(this._quantidadeLinhas, this._quantidadeColunas) || temObstaculoEm(novaPosicao)) {
        return posicaoPersonagem;
      }

      posicaoPersonagem = novaPosicao;
    }

  };

  return Movimentacao;

});
