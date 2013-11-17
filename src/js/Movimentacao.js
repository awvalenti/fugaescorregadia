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

  Movimentacao.prototype.movimentarPersonagem = function(posicaoPersonagem, direcao) {
    var novaPosicao = posicaoPersonagem;
    while (novaPosicao.somar(direcao).estaContidaEm(this._altura, this._largura)) {
      novaPosicao = novaPosicao.somar(direcao);
    }

    return novaPosicao;
  };

  return Movimentacao;

});
