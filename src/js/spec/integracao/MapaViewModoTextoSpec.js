define([
  'prod/aplicacao/CompiladorMapa',
  'prod/aplicacao/MapaViewModoTexto',
  '$'
],
function(
  CompiladorMapa,
  MapaViewModoTexto,
  $
) {
  'use strict';

  describe('MapaViewModoTexto', function() {
    var compilador = null, view = null;

    beforeEach(function() {
      compilador = new CompiladorMapa();
      view = new MapaViewModoTexto($('<div>'));
    });

    it('deve preencher elemento html com matriz de elementos do jogo', function() {
      var matrizMapa = compilador.compilar(1, 4, 'p _ _ _');
      view.desenharMatrizMapa(matrizMapa);
      expect($('.PERSONAGEM').length).toBe(1);
    });
  });

});
