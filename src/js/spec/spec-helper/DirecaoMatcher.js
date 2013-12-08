define([
  'lib/non-amd/underscore',
  'enumerate',
  'Direcao'
],
function(
  _,
  enumerate,
  Direcao
) {
  'use strict';

  function AlgumaDirecaoExceto(direcaoAExcluir) {
    this._direcaoAExcluir = direcaoAExcluir;
  }

  AlgumaDirecaoExceto.prototype.matches = function(direcaoAVerificar) {
    return _(Direcao.values()).chain().without(this._direcaoAExcluir).any(function(direcaoAtual) {
      return direcaoAtual.matches(direcaoAVerificar);
    }).value();
  };

  return enumerate(
    'ALGUMA_DIRECAO', {
      matches: function(direcaoAVerificar) {
        return _(Direcao.values()).any(function(direcaoAtual) { return direcaoAtual.matches(direcaoAVerificar); });
      },
      exceto:  function(direcao) { return new AlgumaDirecaoExceto(direcao); }
    },
    'TODAS_DIRECOES', {
      matches: function(direcaoAVerificar) { return false; }
    }
  );

});
