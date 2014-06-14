define([
  'prod/libs-originais/enumerate',
  'prod/aplicacao/model/EventoElemento',
  'prod/aplicacao/model/Direcao/BAIXO',
  'prod/aplicacao/model/Direcao/CIMA',
  'prod/aplicacao/model/Direcao/DIREITA',
  'prod/aplicacao/model/Direcao/ESQUERDA',
],
function(
  enumerate,
  EventoElemento,
  BAIXO,
  CIMA,
  DIREITA,
  ESQUERDA
) {
  'use strict';

  return enumerate({
      constructor: function(caractere) {
        this._caractere = caractere;
      },

      permiteEntrarVindoDe:      function(direcao) { return true; },
      permiteSairLogoAposEntrar: function()        { return true; },

      _eventoAoEntrar: EventoElemento.CONTINUACAO_MOVIMENTO,

      aoEntrar: function(resultadoMovimento, posicaoAtual) {
        return this._eventoAoEntrar.aoEntrar(resultadoMovimento, posicaoAtual);
      }
    },

    'VAZIO',         ['_'],
    'OBSTACULO',     ['o'], { permiteEntrarVindoDe: function()        { return false; } },
    'PERSONAGEM',    ['p'],
    'SETA_CIMA',     ['^'], { permiteEntrarVindoDe: function(direcao) { return direcao.matches(CIMA); } },
    'SETA_BAIXO',    ['v'], { permiteEntrarVindoDe: function(direcao) { return direcao.matches(BAIXO); } },
    'SETA_ESQUERDA', ['['], { permiteEntrarVindoDe: function(direcao) { return direcao.matches(ESQUERDA); } },
    'SETA_DIREITA',  [']'], { permiteEntrarVindoDe: function(direcao) { return direcao.matches(DIREITA); } },
    'COLA',          ['c'], { permiteSairLogoAposEntrar: function() { return false; } },
    'ITEM',          ['i'], { _eventoAoEntrar: EventoElemento.COLETA_ITEM },

    {
      comCaractere: function(caractere) {
        for (var name in this.values()) {
          var elemento = this.values()[name];
          if (elemento._caractere === caractere) return elemento;
        }

        throw new Error('Caractere nao reconhecido: ' + caractere);
      }
    }

  );

});
