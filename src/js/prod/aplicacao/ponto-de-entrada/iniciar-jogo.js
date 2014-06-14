define([
  'prod/aplicacao/view/MapaViewModoTexto',
  'prod/aplicacao/model/CompiladorMapa',
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