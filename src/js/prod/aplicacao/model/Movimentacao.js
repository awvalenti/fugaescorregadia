define([
  'prod/libs-originais/assert',
  'prod/aplicacao/model/ResultadoMovimento'
],
function(
  assert,
  ResultadoMovimento
) {
  'use strict';

  function Movimentacao(quantidadeLinhas, quantidadeColunas) {
    assert.args(quantidadeLinhas, 'number', quantidadeColunas, 'number');

    this._quantidadeLinhas = quantidadeLinhas;
    this._quantidadeColunas = quantidadeColunas;
  }

  Movimentacao.prototype.calcularMovimento = function(posicaoAtual, direcao, mapa) {
    var resultadoMovimento = new ResultadoMovimento(posicaoAtual, []);

    var novaPosicao, elemento;
    while (
      (novaPosicao = posicaoAtual.somar(direcao))
      && novaPosicao.estaDentroDosLimites(this._quantidadeLinhas, this._quantidadeColunas)
      && (elemento = mapa.elementoEm(novaPosicao))
      && elemento.permiteEntrarVindoDe(direcao)
    ) {
      posicaoAtual = novaPosicao;

      elemento.aoEntrar(resultadoMovimento, posicaoAtual);

      if (!elemento.permiteSairLogoAposEntrar()) break;
    }

    return resultadoMovimento;
  };

  return Movimentacao;

});
