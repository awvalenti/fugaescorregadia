define([
  'lib/non-amd/underscore',
  'Movimentacao',
  'RepoPosicoes',
  'Direcao/BAIXO',
  'Direcao/CIMA',
  'Direcao/DIREITA',
  'Direcao/ESQUERDA',
  'Elemento/VAZIO',
  'Elemento/OBSTACULO',
  'Elemento/COLA',
  'Elemento/ITEM',
  'Elemento/SETA_CIMA',
  'Elemento/SETA_BAIXO',
  'FabricaEventos'
],
function(
  _,
  Movimentacao,
  RepoPosicoes,
  BAIXO,
  CIMA,
  DIREITA,
  ESQUERDA,
  VAZIO,
  OBSTACULO,
  COLA,
  ITEM,
  SETA_CIMA,
  SETA_BAIXO,
  FabricaEventos
) {
  'use strict';

  function tabuleiroVazio()         { return VAZIO; }
  function bloqueioEm10_15(posicao) { return posicao.eh(10, 15) ? OBSTACULO : VAZIO; }
  function colaEm10_15(posicao)     { return posicao.eh(10, 15) ? COLA : VAZIO; }
  function itemEm10_15(posicao)     { return posicao.eh(10, 15) ? ITEM : VAZIO; }

  describe('Movimentacao', function() {
    var dezDez = null, mov = null, aPosicao = null;

    beforeEach(function() {
      aPosicao = _(RepoPosicoes.prototype.obter).bind(new RepoPosicoes());
      dezDez = aPosicao(10, 10);
      mov = new Movimentacao(21, 21);
    });

    describe('livre', function() {
      it('deve encerrar movimento uma posicao antes das extremidades do tabuleiro', function() {
        expect(mov.movimentarPersonagem(dezDez, BAIXO,    tabuleiroVazio)).toEqual([FabricaEventos.movimentoPara(aPosicao(20, 10))]);
        expect(mov.movimentarPersonagem(dezDez, CIMA,     tabuleiroVazio)).toEqual([FabricaEventos.movimentoPara(aPosicao(0, 10))]);
        expect(mov.movimentarPersonagem(dezDez, DIREITA,  tabuleiroVazio)).toEqual([FabricaEventos.movimentoPara(aPosicao(10, 20))]);
        expect(mov.movimentarPersonagem(dezDez, ESQUERDA, tabuleiroVazio)).toEqual([FabricaEventos.movimentoPara(aPosicao(10, 0))]);
      });
    });

    describe('atingindo um bloqueio no meio do caminho', function() {
      it('deve encerrar movimento uma posicao antes', function() {
        expect(mov.movimentarPersonagem(dezDez, DIREITA, bloqueioEm10_15)).toEqual([FabricaEventos.movimentoPara(aPosicao(10, 14))]);
      });
    });

    describe('bloqueada logo no inicio', function() {
      it('deve gerar vetor de eventos vazio', function() {
        expect(mov.movimentarPersonagem(aPosicao(10, 14), DIREITA, bloqueioEm10_15)).toEqual([]);
      });
    });

    describe('passando por COLA', function() {
      it('deve encerrar movimento na posicao da COLA', function() {
        expect(mov.movimentarPersonagem(dezDez, DIREITA, colaEm10_15)).toEqual([FabricaEventos.movimentoPara(aPosicao(10, 15))]);
      });

      it('deve permitir fazer outro movimento a partir da COLA', function() {
        expect(mov.movimentarPersonagem(aPosicao(10, 15), BAIXO, colaEm10_15)).toEqual([FabricaEventos.movimentoPara(aPosicao(20, 15))]);
      });
    });

    describe('passando por ITEM', function() {
      it('deve produzir evento COLETA_ITEM', function() {
        expect(mov.movimentarPersonagem(dezDez, DIREITA, itemEm10_15)).toEqual([FabricaEventos.movimentoPara(aPosicao(10, 15)), FabricaEventos.item(), FabricaEventos.movimentoPara(aPosicao(10, 20))]);
      });
    });

  });

});
