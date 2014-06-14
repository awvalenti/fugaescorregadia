define([
  'prod/aplicacao/model/Elemento/VAZIO',
  'prod/aplicacao/model/Elemento/PERSONAGEM',
  'prod/aplicacao/model/MapaModel'
],
function(
  VAZIO,
  PERSONAGEM,
  MapaModel
) {
  'use strict';

  describe('MapaModel', function() {
    var mapaModel = null;

    beforeEach(function() {
      mapaModel = new MapaModel([
        [VAZIO, PERSONAGEM, VAZIO],
        [VAZIO, VAZIO     , VAZIO]
      ]);
    });

    it('deve permitir percorrer elementos', function() {
      var chamadasALinha = 0, elementosObtidos = [];

      mapaModel.paraCada({
        linha: function() { ++chamadasALinha; },
        elemento: function(elemento) { elementosObtidos.push(elemento); }
      });

      expect(chamadasALinha).toBe(2);
      expect(elementosObtidos).toEqual([VAZIO, PERSONAGEM, VAZIO, VAZIO, VAZIO, VAZIO]);
    });

  });

});
