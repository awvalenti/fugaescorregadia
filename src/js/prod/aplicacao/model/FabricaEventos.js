define(function(
) {
  'use strict';

  // --------------------------------------------------------------

  function EventoMovimento(posicaoDestino) {
    this.setPosicaoDestino(posicaoDestino);
  };

  EventoMovimento.prototype.setPosicaoDestino = function(posicaoDestino) {
    this._posicaoDestino = posicaoDestino;
  };

  EventoMovimento.prototype.toString = function() {
    return 'para' + this._posicaoDestino;
  };

  EventoMovimento.prototype.ehMovimento = true;

  // --------------------------------------------------------------

  var EVENTO_ITEM = { toString: function() { return 'ITEM'; } };

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
