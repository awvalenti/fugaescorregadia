define([
  'prod/aplicacao/model/posicao/RepoPosicoes',
  '_'
],
function(
  RepoPosicoes,
  _
) {
  'use strict';

  return function() {
    return _(RepoPosicoes.prototype.obter).bind(new RepoPosicoes());
  };

});
