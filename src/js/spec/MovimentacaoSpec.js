define([
  'Movimentacao',
  'RepoPosicoes',
  'Direcao/BAIXO',
  'Direcao/CIMA',
  'Direcao/DIREITA',
  'Direcao/ESQUERDA',
  'Elemento/VAZIO',
  'Elemento/OBSTACULO',
  'Elemento/SETA_CIMA',
],
function(
  Movimentacao,
  RepoPosicoes,
  BAIXO,
  CIMA,
  DIREITA,
  ESQUERDA,
  VAZIO,
  OBSTACULO,
  SETA_CIMA
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

    describe('com OBSTACULO', function() {
      it('deve bloquear movimento uma posicao antes', function() {
        function temObstaculoEm(posicao) { return posicao.eh(2, 4) || posicao.eh(3, 2); }

        expect(mov.movimentarPersonagem(doisDois, DIREITA, temObstaculoEm)).toBe(repoPosicoes.obter(2, 3));
        expect(mov.movimentarPersonagem(doisDois, BAIXO, temObstaculoEm)).toBe(repoPosicoes.obter(2, 2));
      });
    });

    describe('com SETA', function() {
      function elementoEm(posicao) {
        return posicao.eh(1, 2) || posicao.eh(3, 2) ? SETA_CIMA : VAZIO;
      }

      it('deve permitir movimento na direcao apontada', function() {
        expect(mov.movimentarPersonagem(doisDois, CIMA, elementoEm)).toBe(repoPosicoes.obter(0, 2));
      });

      it('deve bloquear movimento em outras direcoes', function() {
        expect(mov.movimentarPersonagem(doisDois, BAIXO, elementoEm)).toBe(repoPosicoes.obter(2, 2));
      });
    });
  });

});
