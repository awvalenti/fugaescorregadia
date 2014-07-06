define([
  'prod/aplicacao/model/TabuleiroModel',
  'prod/aplicacao/controller/TabuleiroController',
  'prod/aplicacao/view/TabuleiroViewHtmlTable',
  'prod/aplicacao/model/Mapa',
  'prod/aplicacao/model/Movimentacao',
  'prod/aplicacao/model/ResultadoMovimento',
  'prod/aplicacao/model/FabricaEventos',
  'prod/aplicacao/model/Direcao/DIREITA',
  'prod/aplicacao/model/RepoPosicoes',
  '_'
],
function(
  TabuleiroModel,
  TabuleiroController,
  TabuleiroViewHtmlTable,
  Mapa,
  Movimentacao,
  ResultadoMovimento,
  FabricaEventos,
  DIREITA,
  RepoPosicoes,
  _
) {
  'use strict';

  describe('Tabuleiro Model + View + Controller', function() {
    var model = null, view = null, controller = null, mov = null;

    beforeEach(function() {
      var repoPosicoes = new RepoPosicoes();

      mov = new Movimentacao(3, 4);
      model = new TabuleiroModel(repoPosicoes, new Mapa(3, 4, '' +
        '_ _ p' +
        'o _ _' +
        '_ _ _' +
        '_ i _'
      ), mov);
      view = new TabuleiroViewHtmlTable();
      controller = new TabuleiroController(model, view);
    });

    describe('ao receber um comando de movimento', function() {
      beforeEach(function() {
        controller.executarMovimento(DIREITA);
      });

      it('tabuleiro mostrado deve estar sem o item e com personagem na nova posicao', function() {
      });

    });

  });

});
