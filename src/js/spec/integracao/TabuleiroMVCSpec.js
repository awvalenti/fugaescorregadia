define([
  'spec/integracao/utils/TabuleiroViewHtmlTableSpecUtils',
  'prod/aplicacao/model/TabuleiroModel',
  'prod/aplicacao/controller/TabuleiroController',
  'prod/aplicacao/view/TabuleiroViewHtmlTable',
  'prod/aplicacao/model/Mapa',
  'prod/aplicacao/model/Movimentacao',
  'prod/aplicacao/model/Direcao/CIMA',
  'prod/aplicacao/model/Direcao/BAIXO',
  'prod/aplicacao/model/Direcao/ESQUERDA',
  'prod/aplicacao/model/Direcao/DIREITA',
  'prod/aplicacao/model/Elemento/PERSONAGEM',
  'prod/aplicacao/model/Elemento/VAZIO',
  'prod/aplicacao/model/posicao/fabricarAPosicao',
  '_',
  '$'
],
function(
  TabuleiroViewHtmlTableSpecUtils,
  TabuleiroModel,
  TabuleiroController,
  TabuleiroViewHtmlTable,
  Mapa,
  Movimentacao,
  CIMA,
  BAIXO,
  ESQUERDA,
  DIREITA,
  PERSONAGEM,
  VAZIO,
  fabricarAPosicao,
  _,
  $
) {
  'use strict';

  describe('Tabuleiro Model + View + Controller', function() {
    var model = null, view = null, controller = null, mov = null, $elementoRaiz = null;

    beforeEach(function() {
      $elementoRaiz = $('<div>');
      var aPosicao = fabricarAPosicao();

      mov = new Movimentacao(4, 3);
      model = new TabuleiroModel(aPosicao, new Mapa(4, 3,
        '_ _ p' +
        'o _ _' +
        '_ _ i' +
        '_ _ _' +
        ''
      ), mov);
      view = new TabuleiroViewHtmlTable($elementoRaiz);
      view.desenharTabuleiroModel(model);
      controller = new TabuleiroController(model, view);
    });

    describe('ao receber um comando de movimento', function() {
      beforeEach(function() {
        controller.executarMovimento(BAIXO);
      });

      it('tabuleiro mostrado deve estar sem o item', function() {
        expect(TabuleiroViewHtmlTableSpecUtils.obterElementoJogo($elementoRaiz, 2, 2)).toBe(VAZIO);
      });

      it('tabuleiro mostrado deve estar com personagem na nova posicao', function() {
        expect(TabuleiroViewHtmlTableSpecUtils.obterElementoJogo($elementoRaiz, 3, 2)).toBe(PERSONAGEM);
      });

    });

  });

});
