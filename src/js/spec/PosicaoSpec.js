define([
  'Posicao'
],
function(
  Posicao
) {
  'use strict';

  describe('Posicao', function() {
    var posicao = null;

    beforeEach(function() {
      posicao = Posicao.criarFabrica();
    });

    it('deve conter propriedades linha e coluna', function() {
      expect(posicao(1, 2).linha).toBe(1);
      expect(posicao(1, 2).coluna).toBe(2);
    });

    it('usando mesma fabrica, deve reaproveitar instancias', function() {
      expect(posicao(3, 4)).toBe(posicao(3, 4));
    });

    it('usando fabricas diferentes, deve criar instancias diferentes', function() {
      expect(posicao(5, 6)).not.toBe(Posicao.criarFabrica()(5, 6));
    });

    it('deve proibir argumentos nao-inteiros', function() {
      expect(function() { posicao('hasOwnProperty', 5); }).toThrow();
      expect(function() { posicao(5, 'constructor');    }).toThrow();
    });

  });

});
