define([
  'Movimentacao',
  'RepoPosicoes',
  'Direcao/BAIXO',
  'Direcao/CIMA',
  'Direcao/DIREITA',
  'Direcao/ESQUERDA',
  'Elemento/VAZIO',
  'Elemento/OBSTACULO',
  'Elemento/COLA',
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
  COLA,
  SETA_CIMA,
  SETA_BAIXO
) {
  'use strict';

  function tabuleiroVazio()         { return VAZIO; }
  function bloqueioEm10_15(posicao) { return posicao.eh(10, 15) ? OBSTACULO : VAZIO; }
  function colaEm10_15(posicao)     { return posicao.eh(10, 15) ? COLA : VAZIO; }

  describe('Movimentacao', function() {
    var repoPosicoes = null, doisDois = null, mov = null;

    beforeEach(function() {
      repoPosicoes = new RepoPosicoes();
      doisDois = repoPosicoes.obter(10, 10);
      mov = new Movimentacao(21, 21);
    });

    describe('livre', function() {
      it('deve encerrar movimento somente nas extremidades do tabuleiro', function() {
        expect(mov.movimentarPersonagem(doisDois, BAIXO,    tabuleiroVazio)).toBe(repoPosicoes.obter(20, 10));
        expect(mov.movimentarPersonagem(doisDois, CIMA,     tabuleiroVazio)).toBe(repoPosicoes.obter(0, 10));
        expect(mov.movimentarPersonagem(doisDois, DIREITA,  tabuleiroVazio)).toBe(repoPosicoes.obter(10, 20));
        expect(mov.movimentarPersonagem(doisDois, ESQUERDA, tabuleiroVazio)).toBe(repoPosicoes.obter(10, 0));
      });
    });

    describe('com bloqueio', function() {
      it('deve encerrar movimento uma posicao antes', function() {
        expect(mov.movimentarPersonagem(doisDois, DIREITA, bloqueioEm10_15)).toBe(repoPosicoes.obter(10, 14));
      });
    });

    describe('com COLA', function() {
      it('deve encerrar movimento na posicao da COLA', function() {
        expect(mov.movimentarPersonagem(doisDois, DIREITA, colaEm10_15)).toBe(repoPosicoes.obter(10, 15));
      });

      it('deve permitir fazer outro movimento a partir da COLA', function() {
        expect(mov.movimentarPersonagem(repoPosicoes.obter(10, 15), BAIXO, colaEm10_15)).toBe(repoPosicoes.obter(20, 15));
      });
    });

  });

});
