define([
  'prod/aplicacao/model/MapaModel'
],
function(
  MapaModel
) {
  'use strict';

  describe('MapaModel', function() {
    var mapaModel = null;

    beforeEach(function() {
      mapaModel = new MapaModel(2, 3,
        '_ p _' +
        '_ _ _' +
        ''
      );
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
