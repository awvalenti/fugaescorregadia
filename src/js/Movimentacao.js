define([
  'assert',
  'FabricaEventos'
],
function(
  assert,
  FabricaEventos
) {
  'use strict';

  function Movimentacao(quantidadeLinhas, quantidadeColunas) {
    assert.args(quantidadeLinhas, 'number', quantidadeColunas, 'number');

    this._quantidadeLinhas = quantidadeLinhas;
    this._quantidadeColunas = quantidadeColunas;
  }

  Movimentacao.prototype.movimentarPersonagem = function(posicaoInicial, direcao, elementoEm) {
    var posicaoAtual = posicaoInicial;
    var eventosMovimento = [];

    var novaPosicao, elemento;
    while ((novaPosicao = posicaoAtual.somar(direcao)) && (elemento = elementoEm(novaPosicao))
        && novaPosicao.estaDentroDosLimites(this._quantidadeLinhas, this._quantidadeColunas)
        && elemento.permiteEntrarVindoDe(direcao)) {

      posicaoAtual = novaPosicao;

      elemento.aoEntrar(eventosMovimento, posicaoAtual);

      if (!elemento.permiteSairLogoAposEntrar()) break;
    }

    if (posicaoAtual !== posicaoInicial) eventosMovimento.push(FabricaEventos.movimentoPara(posicaoAtual));

    return eventosMovimento;
  };

  return Movimentacao;

});
