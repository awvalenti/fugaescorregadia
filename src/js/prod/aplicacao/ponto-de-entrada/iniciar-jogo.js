define([
  'prod/aplicacao/MapaViewModoTexto',
  'prod/aplicacao/CompiladorMapa',
  '$'
],
function(
  MapaViewModoTexto,
  CompiladorMapa,
  $
) {
  'use strict';

  new MapaViewModoTexto($('body')).desenharMatrizMapa(
    new CompiladorMapa().compilar(3, 3, '_ _ p o _ _ i _ _')
  );

});