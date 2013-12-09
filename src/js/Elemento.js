define([
  'enumerate',
  'FabricaEventos',
  'EventoElemento',
  'Direcao/BAIXO',
  'Direcao/CIMA',
  'Direcao/DIREITA',
  'Direcao/ESQUERDA',
],
function(
  enumerate,
  FabricaEventos,
  EventoElemento,
  BAIXO,
  CIMA,
  DIREITA,
  ESQUERDA
) {
  'use strict';

  return enumerate({
      permiteEntrarVindoDe:      function(direcao) { return true; },
      permiteSairLogoAposEntrar: function()        { return true; },

      _eventoAoEntrar: EventoElemento.CONTINUACAO_MOVIMENTO,

      aoEntrar: function(eventosMovimento, posicaoAtual) {
        return this._eventoAoEntrar.aoEntrar(eventosMovimento, posicaoAtual);
      }
    },

    'VAZIO',
    'OBSTACULO',     { permiteEntrarVindoDe: function()        { return false; } },
    'SETA_CIMA',     { permiteEntrarVindoDe: function(direcao) { return direcao.matches(CIMA); } },
    'SETA_BAIXO',    { permiteEntrarVindoDe: function(direcao) { return direcao.matches(BAIXO); } },
    'SETA_ESQUERDA', { permiteEntrarVindoDe: function(direcao) { return direcao.matches(ESQUERDA); } },
    'SETA_DIREITA',  { permiteEntrarVindoDe: function(direcao) { return direcao.matches(DIREITA); } },
    'COLA',          { permiteSairLogoAposEntrar: function() { return false; } },
    'ITEM',          { _eventoAoEntrar: EventoElemento.COLETA_ITEM}
  );

});
