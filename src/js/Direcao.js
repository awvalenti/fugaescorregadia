define([
],
function(
) {
  'use strict';

  return {
    ESQUERDA: { linha: 0, coluna: -1 },
    CIMA:     { linha: -1, coluna: 0 },
    DIREITA:  { linha: 0, coluna: +1 },
    BAIXO:    { linha: +1, coluna: 0 },
  };

});
