define(function(
) {
  'use strict';

  // --------------------------------------------------------------

  function EventoMovimento(posicaoDestino) {
    this.setPosicaoDestino(posicaoDestino);
  };

  EventoMovimento.prototype.ehMovimento = true;

  EventoMovimento.prototype.setPosicaoDestino = function(posicaoDestino) {
    this._posicaoDestino = posicaoDestino;
  };

  EventoMovimento.prototype.toString = function() {
    return 'para' + this._posicaoDestino;
  };

  EventoMovimento.prototype.tratarEDevolverNovaPosicao = function(funcoes, contexto, posicaoAtual) {
    funcoes.movimento.call(contexto, posicaoAtual, this._posicaoDestino);
    return this._posicaoDestino;
  };

  // --------------------------------------------------------------

  var EVENTO_ITEM = {
    tratarEDevolverNovaPosicao: function(funcoes, contexto, posicaoAtual) {
      funcoes.item.call(contexto, posicaoAtual);
      return posicaoAtual;
    },
    toString: function() { return 'ITEM'; }
  };

  // --------------------------------------------------------------

  return {
    movimentoPara: function(posicao) {
      return new EventoMovimento(posicao);
    },

    item: function() {
      return EVENTO_ITEM;
    }

  };

});
