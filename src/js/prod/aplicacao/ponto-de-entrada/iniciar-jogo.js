define([
  'prod/aplicacao/view/MapaViewHtmlTable',
  'prod/aplicacao/model/CompiladorMapa',
  '$'
],
function(
  MapaViewHtmlTable,
  CompiladorMapa,
  $
) {
  'use strict';

  new MapaViewHtmlTable($('body')).desenharMapaModel(
    new CompiladorMapa().compilar(3, 3, '_ _ p o _ _ i _ _')
  );

});