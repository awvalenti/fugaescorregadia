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
  'Elemento/SETA_BAIXO',
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
  SETA_CIMA,
  SETA_BAIXO
) {
  'use strict';

  describe('Movimentacao', function() {
    function tabuleiroVazio() { return { permiteEntrarVindoDe: function() { return true; } }; }

    var mov = null, repoPosicoes = null, doisDois = null;

    beforeEach(function() {
      repoPosicoes = new RepoPosicoes();
      doisDois = repoPosicoes.obter(2, 2);
      mov = new Movimentacao(5, 5);
    });

    describe('livre', function() {
      it('deve bloquear movimento somente nas extremidades do tabuleiro', function() {
        expect(mov.movimentarPersonagem(doisDois, BAIXO, tabuleiroVazio)).toBe(repoPosicoes.obter(4, 2));
        expect(mov.movimentarPersonagem(doisDois, CIMA, tabuleiroVazio)).toBe(repoPosicoes.obter(0, 2));
        expect(mov.movimentarPersonagem(doisDois, DIREITA, tabuleiroVazio)).toBe(repoPosicoes.obter(2, 4));
        expect(mov.movimentarPersonagem(doisDois, ESQUERDA, tabuleiroVazio)).toBe(repoPosicoes.obter(2, 0));
      });
    });

    describe('com OBSTACULO', function() {
      it('deve bloquear movimento uma posicao antes', function() {
        function elementoEm(posicao) { return posicao.eh(2, 4) || posicao.eh(3, 2) ? OBSTACULO : VAZIO; }

        expect(mov.movimentarPersonagem(doisDois, DIREITA, elementoEm)).toBe(repoPosicoes.obter(2, 3));
        expect(mov.movimentarPersonagem(doisDois, BAIXO, elementoEm)).toBe(repoPosicoes.obter(2, 2));
      });
    });

    describe('com SETA_CIMA', function() {
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

    describe('com SETA_BAIXO', function() {
      function elementoEm(posicao) {
        return posicao.eh(1, 2) || posicao.eh(3, 2) ? SETA_BAIXO : VAZIO;
      }

      it('deve permitir movimento na direcao apontada', function() {
        expect(mov.movimentarPersonagem(doisDois, BAIXO, elementoEm)).toBe(repoPosicoes.obter(4, 2));
      });

      it('deve bloquear movimento em outras direcoes', function() {
        expect(mov.movimentarPersonagem(doisDois, CIMA, elementoEm)).toBe(repoPosicoes.obter(2, 2));
      });
    });
  });

});
