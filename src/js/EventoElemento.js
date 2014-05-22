define([
  'enumerate',
],
function(
  enumerate
) {
  'use strict';

  return enumerate(
    'CONTINUACAO_MOVIMENTO', {
      aoEntrar: function(resultadoMovimento, posicaoAtual) {
        resultadoMovimento.estenderMovimentoPara(posicaoAtual);
      }
    },

    'COLETA_ITEM', {
      aoEntrar: function(resultadoMovimento, posicaoAtual) {
        resultadoMovimento.estenderMovimentoPara(posicaoAtual);
        resultadoMovimento.coletarItem();
      }
    }

  );

});
