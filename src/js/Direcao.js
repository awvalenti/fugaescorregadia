define([
  'enumerate'
],
function(
  enumerate
) {
  'use strict';

  return enumerate({
      matches: function(outraDirecao) { return this === outraDirecao; }
    },
    'ESQUERDA', { linha:  0, coluna: -1 },
    'CIMA',     { linha: -1, coluna:  0 },
    'DIREITA',  { linha:  0, coluna: +1 },
    'BAIXO',    { linha: +1, coluna:  0 }
  );

});
