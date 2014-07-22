define([
  'prod/aplicacao/model/Mapa',
  'prod/aplicacao/model/Elemento/ITEM',
  'prod/aplicacao/model/Elemento/VAZIO',
  'prod/aplicacao/model/Elemento/PERSONAGEM',
  '_'
],
function(
  Mapa,
  ITEM,
  VAZIO,
  PERSONAGEM,
  _
) {
  'use strict';

  describe('Mapa', function() {
    var mapa = null;

    describe('criado corretamente', function() {
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

    describe('criado incorretamente', function() {
      it('deve rejeitar stringMapa com caracteres nao reconhecidos', function() {
        expect(function() { new Mapa(1, 3, '_ _ k'); }).toThrow('Caractere nao reconhecido: k');
      });

      it('deve rejeitar stringMapa com tamanho diferente do esperado', function() {
        expect(function() { new Mapa(1, 2, '_ _ _'); }).toThrow('Esperado: 2 elemento(s). Encontrado: 3 elemento(s).');
        expect(function() { new Mapa(4, 2, '_ _ _'); }).toThrow('Esperado: 8 elemento(s). Encontrado: 3 elemento(s).');
      });

    });

  });

});
