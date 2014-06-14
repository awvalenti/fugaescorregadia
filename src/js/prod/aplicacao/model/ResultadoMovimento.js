define([
  '_',
  'prod/aplicacao/model/FabricaEventos'
],
function(
  _,
  FabricaEventos
) {
  'use strict';

  function ResultadoMovimento() {
    this._eventosMovimento = [];
  }

  ResultadoMovimento.prototype.estenderMovimentoPara = function(posicaoAtual) {
    if (this._eventosMovimento.length > 0 && _(this._eventosMovimento).last().ehMovimento) {
      _(this._eventosMovimento).last().setPosicaoDestino(posicaoAtual);
    } else {
      this._eventosMovimento.push(FabricaEventos.movimentoPara(posicaoAtual));
    }
  };

  ResultadoMovimento.prototype.coletarItem = function() {
    this._eventosMovimento.push(FabricaEventos.item());
  };

  ResultadoMovimento.prototype.emVetor = function() {
    return this._eventosMovimento;
  };

  return ResultadoMovimento;

});
