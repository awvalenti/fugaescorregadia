define([
  'enumerate',
  'FabricaEventos',
],
function(
  enumerate,
  FabricaEventos
) {
  'use strict';

  return enumerate(
    'CONTINUACAO_MOVIMENTO', {
      aoEntrar: function() {}
    },

    'COLETA_ITEM', {
      aoEntrar: function(eventosMovimento, posicaoAtual) {
        eventosMovimento.push(FabricaEventos.movimentoPara(posicaoAtual));
        eventosMovimento.push(FabricaEventos.item());
      }
    },

    ''
  );

});
