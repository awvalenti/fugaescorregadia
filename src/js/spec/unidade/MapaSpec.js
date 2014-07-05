define([
  'prod/aplicacao/model/Mapa',
  'prod/aplicacao/model/RepoPosicoes',
  'prod/aplicacao/model/Elemento/ITEM',
  'prod/aplicacao/model/Elemento/VAZIO',
  'prod/aplicacao/model/Elemento/PERSONAGEM',
  '_'
],
function(
  Mapa,
  RepoPosicoes,
  ITEM,
  VAZIO,
  PERSONAGEM,
  _
) {
  'use strict';

  describe('Mapa', function() {
    var mapa = null;

    beforeEach(function() {
      mapa = new Mapa(2, 3,
        '_ p _' +
        '_ _ i' +
        ''
      );
    });

    it('deve ser imutavel, permitindo somente copiar a matriz', function() {
      expect(mapa.copiarMatriz()).toEqual([[VAZIO, PERSONAGEM, VAZIO], [VAZIO, VAZIO, ITEM]]);
    });

    describe('copias diferentes', function() {
      var umaCopia = null, outraCopia = null;

      beforeEach(function() {
        umaCopia = mapa.copiarMatriz();
        outraCopia = mapa.copiarMatriz();
      });

      it('devem ter mesmo conteudo', function() {
        expect(umaCopia).toEqual(outraCopia);
      });

      it('devem ser objetos independentes', function() {
        expect(umaCopia).not.toBe(outraCopia);
        expect(umaCopia[0]).not.toBe(outraCopia[0]);
        expect(umaCopia[1]).not.toBe(outraCopia[1]);
      });

    });

  });

});
