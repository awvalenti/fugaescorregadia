define([
  'prod/aplicacao/model/Mapa',
  'prod/aplicacao/model/TabuleiroModel',
  'prod/aplicacao/model/fabricarAPosicao',
  'prod/aplicacao/model/Movimentacao',
  'prod/aplicacao/model/Direcao',
  'prod/aplicacao/controller/TabuleiroController',
  'prod/aplicacao/view/TabuleiroViewHtmlTable',
  '_',
  '$'
],
function(
  Mapa,
  TabuleiroModel,
  fabricarAPosicao,
  Movimentacao,
  Direcao,
  TabuleiroController,
  TabuleiroViewHtmlTable,
  _,
  $
) {
  'use strict';

  var model = new TabuleiroModel(
    fabricarAPosicao(),
    new Mapa(4, 3,
      '_ _ p' +
      'o _ _' +
      '_ _ _' +
      'i _ _' +
      ''
    ),
    new Movimentacao(4, 3)
  );

  var $body = $('body');

  var view = new TabuleiroViewHtmlTable($body);
  view.desenharTabuleiroModel(model);

  var controller = new TabuleiroController(model, view);

  $body.keydown(function(e) {
    switch (e.keyCode) {
    case 37:
      controller.executarMovimento(Direcao.ESQUERDA);
      break;
    }
  });
});