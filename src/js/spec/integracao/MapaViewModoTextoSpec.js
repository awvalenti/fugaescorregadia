define([
  'prod/aplicacao/CompiladorMapa',
  'prod/aplicacao/MapaViewModoTexto'
],
function(
  CompiladorMapa,
  MapaViewModoTexto
) {
  'use strict';

  describe('MapaViewModoTexto', function() {
    var compilador = null, view = null;

    beforeEach(function() {
      compilador = new CompiladorMapa();
      view = new MapaViewModoTexto();
    });

    it('deve converter matrizMapa em html', function() {
      var matrizMapa = compilador.compilar('i', 1, 1);
      view.desenhar(matrizMapa);
//      expect($('.ITEM').length).toBe(1);
    });
  });

});
