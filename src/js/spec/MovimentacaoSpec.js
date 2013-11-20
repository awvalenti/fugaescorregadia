define([
  'Movimentacao',
  'RepoPosicoes',
  'Direcao/BAIXO',
  'Direcao/CIMA',
  'Direcao/DIREITA',
  'Direcao/ESQUERDA',
],
function(
  Movimentacao,
  RepoPosicoes,
  BAIXO,
  CIMA,
  DIREITA,
  ESQUERDA
) {
  'use strict';

  describe('Movimentacao', function() {
    var mov = null, repoPosicoes = null, doisDois = null;

    beforeEach(function() {
      repoPosicoes = new RepoPosicoes();
      doisDois = repoPosicoes.obter(2, 2);
      mov = new Movimentacao(5, 5);
    });

    describe('livre', function() {
      it('deve bloquear movimento somente nas extremidades do tabuleiro', function() {
        expect(mov.movimentarPersonagem(doisDois, BAIXO)).toBe(repoPosicoes.obter(4, 2));
        expect(mov.movimentarPersonagem(doisDois, CIMA)).toBe(repoPosicoes.obter(0, 2));
        expect(mov.movimentarPersonagem(doisDois, DIREITA)).toBe(repoPosicoes.obter(2, 4));
        expect(mov.movimentarPersonagem(doisDois, ESQUERDA)).toBe(repoPosicoes.obter(2, 0));
      });
    });

    describe('com obstaculo', function() {
      it('deve bloquear movimento uma posicao antes', function() {
        function temObstaculoEm(posicao) { return posicao === repoPosicoes.obter(2, 4) || posicao === repoPosicoes.obter(3, 2); }

        expect(mov.movimentarPersonagem(doisDois, DIREITA, temObstaculoEm)).toBe(repoPosicoes.obter(2, 3));
        expect(mov.movimentarPersonagem(doisDois, BAIXO, temObstaculoEm)).toBe(repoPosicoes.obter(2, 2));
      });
    });
  });

});
