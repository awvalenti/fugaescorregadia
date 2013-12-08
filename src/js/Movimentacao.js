define([
  'assert',
  'Elemento/VAZIO'
],
function(
  assert,
  VAZIO
) {
  'use strict';

  function Movimentacao(quantidadeLinhas, quantidadeColunas) {
    assert.args(quantidadeLinhas, 'number', quantidadeColunas, 'number');

    this._quantidadeLinhas = quantidadeLinhas;
    this._quantidadeColunas = quantidadeColunas;
  }

  Movimentacao.prototype.movimentarPersonagem = function(posicaoAtualPersonagem, direcao, elementoEm) {
    var novaPosicao;
    while ((novaPosicao = posicaoAtualPersonagem.somar(direcao))
        && novaPosicao.estaDentroDosLimites(this._quantidadeLinhas, this._quantidadeColunas)
        && elementoEm(novaPosicao).permiteEntrarVindoDe(direcao)) {

      posicaoAtualPersonagem = novaPosicao;

      if (!elementoEm(novaPosicao).permiteSair()) break;
    }

    return posicaoAtualPersonagem;
  };

  return Movimentacao;

});
