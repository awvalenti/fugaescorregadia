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

  new MapaViewModoTexto($('<div class="tabuleiro">').appendTo('body')).desenharMatrizMapa(
    new CompiladorMapa().compilar(1, 3, '_ _ p')
  );

});