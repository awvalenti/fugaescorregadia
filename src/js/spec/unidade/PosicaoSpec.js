define([
  'prod/aplicacao/model/posicao/fabricarAPosicao',
  'prod/aplicacao/model/Direcao/CIMA',
  'prod/aplicacao/model/Direcao/BAIXO',
  'prod/aplicacao/model/Direcao/ESQUERDA',
  'prod/aplicacao/model/Direcao/DIREITA'
],
function(
  fabricarAPosicao,
  CIMA,
  BAIXO,
  ESQUERDA,
  DIREITA
) {
  'use strict';

  describe('Posicao', function() {
    var aPosicao = null;

    beforeEach(function() {
      aPosicao = fabricarAPosicao();
    });

    it('deve somar direcao', function() {
      expect(aPosicao(10, 20).somar(BAIXO)).toBe(aPosicao(11, 20));
      expect(aPosicao(10, 20).somar(CIMA)).toBe(aPosicao(9, 20));
      expect(aPosicao(10, 20).somar(ESQUERDA)).toBe(aPosicao(10, 19));
      expect(aPosicao(10, 20).somar(DIREITA)).toBe(aPosicao(10, 21));
    });

    it('deve permitir comparacao de igualdade conveniente, por meio do metodo eh(linha, coluna)', function() {
      expect(aPosicao(1, 2).eh(1, 2)).toBe(true);
      expect(aPosicao(1, 2).eh(3, 4)).toBe(false);
    });

    it('deve reconhecer limites', function() {
      expect(aPosicao(0, 0).estaDentroDosLimites(10, 10)).toBe(true);
      expect(aPosicao(5, 5).estaDentroDosLimites(10, 10)).toBe(true);
      expect(aPosicao(9, 9).estaDentroDosLimites(10, 10)).toBe(true);

      expect(aPosicao(10, 9).estaDentroDosLimites(10, 10)).toBe(false);
      expect(aPosicao(9, 10).estaDentroDosLimites(10, 10)).toBe(false);
      expect(aPosicao(10, 10).estaDentroDosLimites(10, 10)).toBe(false);
      expect(aPosicao(11, 11).estaDentroDosLimites(10, 10)).toBe(false);

      expect(aPosicao(-1, 9).estaDentroDosLimites(10, 10)).toBe(false);
      expect(aPosicao(9, -2).estaDentroDosLimites(10, 10)).toBe(false);
    });

    it('deve oferecer metodos linha e coluna, que devem ser usados somente para indexar matrizes', function() {
      expect(aPosicao(1, 2).linha()).toBe(1);
      expect(aPosicao(1, 2).coluna()).toBe(2);
    });

  });

});
