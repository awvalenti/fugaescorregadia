define([
],
function(
) {
  'use strict';

  var EVENTO_ITEM = {};

  function EventoMovimento(posicaoDestino) {
    this._posicaoDestino = posicaoDestino;
  }

  return {
    movimentoPara: function(posicao) {
      return new EventoMovimento(posicao);
    },

    item: function() {
      return EVENTO_ITEM;
    }

  };

});
