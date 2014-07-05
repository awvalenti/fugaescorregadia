define([
  'prod/aplicacao/model/Mapa',
  'prod/aplicacao/model/TabuleiroModel',
  'prod/aplicacao/model/RepoPosicoes',
  'prod/aplicacao/model/Movimentacao',
  'prod/aplicacao/model/Direcao',
  'prod/aplicacao/view/TabuleiroViewHtmlTable',
  '_',
  '$'
],
function(
  Mapa,
  TabuleiroModel,
  RepoPosicoes,
  Movimentacao,
  Direcao,
  TabuleiroViewHtmlTable,
  _,
  $
) {
  'use strict';

  var aPosicao = _(RepoPosicoes.prototype.obter).bind(new RepoPosicoes());

  var tabuleiroModel = new TabuleiroModel(new Mapa(3, 3,
    '_ _ p' +
    'o _ _' +
    'i _ _' +
    ''
  ));

  var mov = new Movimentacao(3, 3);

  var $body = $('body');

  var tabuleiroView = new TabuleiroViewHtmlTable($body);
  tabuleiroView.desenharTabuleiroModel(tabuleiroModel);

  $('body').keydown(function(e) {
    switch (e.keyCode) {
    case 37:
      var resultadoMovimento = mov.movimentarPersonagem(aPosicao(0, 2), Direcao.ESQUERDA,
          tabuleiroModel.elementoEm.bind(tabuleiroModel));
      _(resultadoMovimento).each(function() {
        tabuleiroView.movimentarPersonagem(aPosicao);
      });
      break;
    }
  });
});