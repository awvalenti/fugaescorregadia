define([
  'prod/aplicacao/model/ResultadoMovimento',
  'prod/aplicacao/model/FabricaEventos',
  '_'
],
function(
  ResultadoMovimento,
  FabricaEventos,
  _
) {
  'use strict';

  var movimentoPara = FabricaEventos.movimentoPara,
      item          = FabricaEventos.item;

  function ResultadoMovimentoBuilder(aPosicao) {
    this._aPosicao = aPosicao;
    this._origem = null;
    this._eventos = [];
  }

  ResultadoMovimentoBuilder.prototype.parteDe = function(linhaOrigem, colunaOrigem) {
    if (this._origem) throw new Error("Ponto de partida ja' foi definido");

    this._origem = this._aPosicao(linhaOrigem, colunaOrigem);
    return this;
  };

  ResultadoMovimentoBuilder.prototype.vaiPara = function(linhaDestino, colunaDestino) {
    this._eventos.push(movimentoPara(this._aPosicao(linhaDestino, colunaDestino)));
    return this;
  };

  ResultadoMovimentoBuilder.prototype.pegaItem = function(linhaDestino, colunaDestino) {
    this._eventos.push(item());
    return this;
  };

  ResultadoMovimentoBuilder.prototype.eTermina = function() {
    return new ResultadoMovimento(this._origem, this._eventos);
  };


  return ResultadoMovimentoBuilder;

});
