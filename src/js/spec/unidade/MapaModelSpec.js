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
      var resultado = '';

      mapaModel.paraCada({
        inicioLinha: function()         { resultado += 'inicioLinha '; },
        elemento:    function(elemento) { resultado += elemento + ' '; },
        fimLinha:    function()         { resultado += 'fimLinha ';    }
      });

      expect(resultado).toBe(
        'inicioLinha VAZIO PERSONAGEM VAZIO fimLinha ' +
        'inicioLinha VAZIO VAZIO VAZIO fimLinha '
      );
    });

  });

});
