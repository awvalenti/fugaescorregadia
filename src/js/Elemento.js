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
      permiteEntrarVindoDe: function(direcao) { return true; },
      permiteSair: function() { return true; },
    },
    'VAZIO',
    'OBSTACULO',     { permiteEntrarVindoDe: function() { return false; } },
    'SETA_CIMA',     { permiteEntrarVindoDe: function(direcao) { return direcao.matches(CIMA); } },
    'SETA_BAIXO',    { permiteEntrarVindoDe: function(direcao) { return direcao.matches(BAIXO); } },
    'SETA_ESQUERDA', { permiteEntrarVindoDe: function(direcao) { return direcao.matches(ESQUERDA); } },
    'SETA_DIREITA',  { permiteEntrarVindoDe: function(direcao) { return direcao.matches(DIREITA); } },
    'COLA',          { permiteSair: function() { return false; } }
  );

});
