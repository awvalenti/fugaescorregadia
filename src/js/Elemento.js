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

  return enumerate('VAZIO', 'OBSTACULO', 'SETA_CIMA', {
    permitePassagemPara: function(direcao) { return direcao === CIMA; }
  });

});
