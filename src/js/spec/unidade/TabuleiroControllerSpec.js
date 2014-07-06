define([
  'prod/aplicacao/model/ResultadoMovimento',
  'prod/aplicacao/model/FabricaEventos',
  'prod/aplicacao/controller/TabuleiroController',
  'prod/aplicacao/model/Direcao/DIREITA',
  'prod/aplicacao/model/RepoPosicoes',
  '_'
],
function(
  ResultadoMovimento,
  FabricaEventos,
  TabuleiroController,
  DIREITA,
  RepoPosicoes,
  _
) {
  'use strict';

  var movimentoPara = FabricaEventos.movimentoPara,
      item = FabricaEventos.item;

  describe('TabuleiroController', function() {
    var controller = null, model = null, aPosicao = null, view = null;

    beforeEach(function() {
      aPosicao = _(RepoPosicoes.prototype.obter).bind(new RepoPosicoes());
      model = { executarMovimento: function() {} };
      spyOn(model, 'executarMovimento').andReturn(
          new ResultadoMovimento(aPosicao(0, 0), [movimentoPara(aPosicao(2, 0)), item(), movimentoPara(aPosicao(4, 0))]));
      view = jasmine.createSpyObj('view', ['reposicionarPersonagem', 'coletarItem']);

      controller = new TabuleiroController(model, view);
      controller.executarMovimento(DIREITA);
    });

    it('deve repassar comandos para o model', function() {
      expect(model.executarMovimento).toHaveBeenCalledWith(DIREITA);
    });

    it('deve coletar a resposta do model e traduzir para a view', function() {
      expect(view.reposicionarPersonagem).toHaveBeenCalledWith(aPosicao(0, 0), aPosicao(2, 0));
      expect(view.coletarItem).toHaveBeenCalledWith(aPosicao(2, 0));
    });

  });

});
