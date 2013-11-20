define([
  'Posicao',
  'Direcao/BAIXO',
  'Direcao/CIMA',
  'Direcao/DIREITA',
  'Direcao/ESQUERDA',
],
function(
  Posicao,
  BAIXO,
  CIMA,
  DIREITA,
  ESQUERDA
) {
  'use strict';

  describe('Posicao', function() {
    var posicao = null;

    beforeEach(function() {
      posicao = Posicao.criarFabrica();
    });

    it('nao deve oferecer propriedades publicas linha e coluna, priorizando o uso como objeto, mesmo', function() {
      expect(posicao(1, 2).linha).toBeUndefined();
      expect(posicao(1, 2).coluna).toBeUndefined();
    });

    it('deve somar direcao', function() {
      expect(posicao(10, 20).somar(BAIXO)).toBe(posicao(11, 20));
      expect(posicao(10, 20).somar(CIMA)).toBe(posicao(9, 20));
      expect(posicao(10, 20).somar(ESQUERDA)).toBe(posicao(10, 19));
      expect(posicao(10, 20).somar(DIREITA)).toBe(posicao(10, 21));
    });

    it('deve reconhecer limites', function() {
      expect(posicao(0, 0).estaContidaEm(10, 10)).toBe(true);
      expect(posicao(5, 5).estaContidaEm(10, 10)).toBe(true);
      expect(posicao(9, 9).estaContidaEm(10, 10)).toBe(true);

      expect(posicao(10, 9).estaContidaEm(10, 10)).toBe(false);
      expect(posicao(9, 10).estaContidaEm(10, 10)).toBe(false);
      expect(posicao(10, 10).estaContidaEm(10, 10)).toBe(false);
      expect(posicao(11, 11).estaContidaEm(10, 10)).toBe(false);

      expect(posicao(-1, 9).estaContidaEm(10, 10)).toBe(false);
      expect(posicao(-2, 9).estaContidaEm(10, 10)).toBe(false);
    });

    it('usando mesma fabrica, deve reaproveitar instancias', function() {
      expect(posicao(3, 4)).toBe(posicao(3, 4));
    });

    it('usando fabricas diferentes, deve criar instancias diferentes', function() {
      expect(posicao(5, 6)).not.toBe(Posicao.criarFabrica()(5, 6));
    });

    it('deve proibir argumentos nao-numericos', function() {
      expect(function() { posicao('hasOwnProperty', 5); }).toThrow();
      expect(function() { posicao(5, 'constructor');    }).toThrow();
    });

  });

});
