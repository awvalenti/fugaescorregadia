define([
  'prod/aplicacao/view/MapaViewHtmlTable',
  'prod/aplicacao/model/MapaModel',
  '$'
],
function(
  MapaViewHtmlTable,
  MapaModel,
  $
) {
  'use strict';

  new MapaViewHtmlTable($('body')).desenharMapaModel(
    new MapaModel(3, 3,
      '_ _ p' +
      'o _ _' +
      'i _ _' +
      ''
    )
  );

});