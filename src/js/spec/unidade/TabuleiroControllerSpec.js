define([
  'prod/aplicacao/model/ResultadoMovimento',
  'prod/aplicacao/model/FabricaEventos',
  'prod/aplicacao/controller/TabuleiroController',
  'prod/aplicacao/model/Direcao/DIREITA',
  'prod/aplicacao/model/posicao/fabricarAPosicao',
  '_'
],
function(
  ResultadoMovimento,
  FabricaEventos,
  TabuleiroController,
  DIREITA,
  fabricarAPosicao,
  _
) {
  'use strict';

  var movimentoPara = FabricaEventos.movimentoPara,
      item = FabricaEventos.item;

  describe('TabuleiroController', function() {
    var controller = null, model = null, aPosicao = null, chamadasAView = null;

    beforeEach(function() {
      aPosicao = fabricarAPosicao();

      model = { executarMovimento: function() {} };

      spyOn(model, 'executarMovimento').andReturn(new ResultadoMovimento(
          aPosicao(0, 0), [movimentoPara(aPosicao(2, 0)), item(), movimentoPara(aPosicao(4, 0))]));

      chamadasAView = '';

      var view = {
        reposicionarPersonagem: function(origem, destino) { chamadasAView += origem + '->' + destino + ' '; },
        coletarItem:            function(posicao)         { chamadasAView += 'item:' + posicao + ' '; }
      };

      controller = new TabuleiroController(model, view);
      controller.executarMovimento(DIREITA);
    });

    it('deve repassar comandos para o model', function() {
      expect(model.executarMovimento).toHaveBeenCalledWith(DIREITA);
    });

    it('deve coletar a resposta do model e traduzir para a view', function() {
      expect(chamadasAView).toBe('(0, 0)->(2, 0) item:(2, 0) (2, 0)->(4, 0) ');
    });

  });

});
