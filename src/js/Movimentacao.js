define([
  'assert'
],
function(
  assert
) {
  'use strict';

  function Movimentacao(params) {
    assert.args(params.posicao, 'function', params.largura, 'number', params.altura, 'number');

    this._posicao = params.posicao;
    this._largura = params.largura;
    this._altura = params.altura;
  }

  Movimentacao.prototype.movimentarPersonagem = function(posicaoPersonagem, direcao, temObstaculoEm) {
    if (typeof temObstaculoEm === 'undefined') temObstaculoEm = function(posicao) { return false; };

    for (;;) {
      var novaPosicao = posicaoPersonagem.somar(direcao);

      if (!novaPosicao.estaContidaEm(this._altura, this._largura) || temObstaculoEm(novaPosicao)) {
        return posicaoPersonagem;
      }

      posicaoPersonagem = novaPosicao;
    }

  };

  return Movimentacao;

});
