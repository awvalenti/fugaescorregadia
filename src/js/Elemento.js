define([
  'enumerate',
  'Direcao/BAIXO',
  'Direcao/CIMA',
  'Direcao/DIREITA',
  'Direcao/ESQUERDA',
],
function(
  enumerate,
  BAIXO,
  CIMA,
  DIREITA,
  ESQUERDA
) {
  'use strict';

  return enumerate({
      permitePassagemPara: function() { return true; }
    },
    'VAZIO',
    'OBSTACULO', { permitePassagemPara: function() { return false; } },
    'SETA_CIMA', { permitePassagemPara: function(direcao) { return direcao === CIMA; } }
  );

});
