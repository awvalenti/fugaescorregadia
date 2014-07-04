define([
  'prod/aplicacao/model/RepoPosicoes',
  'prod/aplicacao/model/Direcao/BAIXO',
  'prod/aplicacao/model/Direcao/CIMA',
  'prod/aplicacao/model/Direcao/DIREITA',
  'prod/aplicacao/model/Direcao/ESQUERDA',
],
function(
  RepoPosicoes,
  BAIXO,
  CIMA,
  DIREITA,
  ESQUERDA
) {
  'use strict';

  describe('Posicao', function() {
    var repoPosicoes = null;

    beforeEach(function() {
      repoPosicoes = new RepoPosicoes();
    });

    it('deve somar direcao', function() {
      expect(repoPosicoes.obter(10, 20).somar(BAIXO)).toBe(repoPosicoes.obter(11, 20));
      expect(repoPosicoes.obter(10, 20).somar(CIMA)).toBe(repoPosicoes.obter(9, 20));
      expect(repoPosicoes.obter(10, 20).somar(ESQUERDA)).toBe(repoPosicoes.obter(10, 19));
      expect(repoPosicoes.obter(10, 20).somar(DIREITA)).toBe(repoPosicoes.obter(10, 21));
    });

    it('deve permitir comparacao de igualdade conveniente, por meio do metodo eh(linha, coluna)', function() {
      expect(repoPosicoes.obter(1, 2).eh(1, 2)).toBe(true);
      expect(repoPosicoes.obter(1, 2).eh(3, 4)).toBe(false);
    });

    it('deve reconhecer limites', function() {
      expect(repoPosicoes.obter(0, 0).estaDentroDosLimites(10, 10)).toBe(true);
      expect(repoPosicoes.obter(5, 5).estaDentroDosLimites(10, 10)).toBe(true);
      expect(repoPosicoes.obter(9, 9).estaDentroDosLimites(10, 10)).toBe(true);

      expect(repoPosicoes.obter(10, 9).estaDentroDosLimites(10, 10)).toBe(false);
      expect(repoPosicoes.obter(9, 10).estaDentroDosLimites(10, 10)).toBe(false);
      expect(repoPosicoes.obter(10, 10).estaDentroDosLimites(10, 10)).toBe(false);
      expect(repoPosicoes.obter(11, 11).estaDentroDosLimites(10, 10)).toBe(false);

      expect(repoPosicoes.obter(-1, 9).estaDentroDosLimites(10, 10)).toBe(false);
      expect(repoPosicoes.obter(9, -2).estaDentroDosLimites(10, 10)).toBe(false);
    });

    it('deve oferecer metodos linha e coluna, que devem ser usados somente para indexar matrizes', function() {
      expect(repoPosicoes.obter(1, 2).linha()).toBe(1);
      expect(repoPosicoes.obter(1, 2).coluna()).toBe(2);
    });

  });

});
