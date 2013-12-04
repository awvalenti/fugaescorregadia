define([
  'assert',
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

  Movimentacao.prototype.movimentarPersonagem = function(posicaoPersonagem, direcao, elementoEm) {
    if (typeof elementoEm === 'undefined') elementoEm = function(posicao) { return false; };

    for (;;) {
      var novaPosicao = posicaoPersonagem.somar(direcao);

      if (!novaPosicao.estaDentroDosLimites(this._quantidadeLinhas, this._quantidadeColunas) || elementoEm(novaPosicao) === true
          || elementoEm(novaPosicao).permitePassagemPara && !elementoEm(novaPosicao).permitePassagemPara(direcao)) {
        return posicaoPersonagem;
      }

      posicaoPersonagem = novaPosicao;
    }

  };

  return Movimentacao;

});
