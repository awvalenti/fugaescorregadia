define([
  '_',
  'prod/aplicacao/model/Movimentacao',
  'prod/aplicacao/model/RepoPosicoes',
  'prod/aplicacao/model/Direcao/BAIXO',
  'prod/aplicacao/model/Direcao/CIMA',
  'prod/aplicacao/model/Direcao/DIREITA',
  'prod/aplicacao/model/Direcao/ESQUERDA',
  'prod/aplicacao/model/Elemento/VAZIO',
  'prod/aplicacao/model/Elemento/OBSTACULO',
  'prod/aplicacao/model/Elemento/COLA',
  'prod/aplicacao/model/Elemento/ITEM',
  'prod/aplicacao/model/Elemento/SETA_CIMA',
  'prod/aplicacao/model/Elemento/SETA_BAIXO',
  'prod/aplicacao/model/FabricaEventos'
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

  var movimentoPara = FabricaEventos.movimentoPara,
      item = FabricaEventos.item;

  describe('Movimentacao', function() {
    var dezDez = null, mov = null, aPosicao = null;

    beforeEach(function() {
      aPosicao = _(RepoPosicoes.prototype.obter).bind(new RepoPosicoes());
      dezDez = aPosicao(10, 10);
      mov = new Movimentacao(21, 21);
    });

    describe('livre', function() {
      it('deve encerrar movimento uma posicao antes das extremidades do tabuleiro', function() {
        expect(mov.movimentarPersonagem(dezDez, BAIXO,    tabuleiroVazio)).toEqual([movimentoPara(aPosicao(20, 10))]);
        expect(mov.movimentarPersonagem(dezDez, CIMA,     tabuleiroVazio)).toEqual([movimentoPara(aPosicao( 0, 10))]);
        expect(mov.movimentarPersonagem(dezDez, DIREITA,  tabuleiroVazio)).toEqual([movimentoPara(aPosicao(10, 20))]);
        expect(mov.movimentarPersonagem(dezDez, ESQUERDA, tabuleiroVazio)).toEqual([movimentoPara(aPosicao(10,  0))]);
      });
    });

    describe('atingindo um bloqueio no meio do caminho', function() {
      it('deve encerrar movimento uma posicao antes', function() {
        expect(mov.movimentarPersonagem(dezDez, DIREITA, bloqueioEm10_15)).toEqual([movimentoPara(aPosicao(10, 14))]);
      });
    });

    describe('bloqueada logo no inicio', function() {
      it('nao deve gerar nenhum movimento', function() {
        expect(mov.movimentarPersonagem(aPosicao(10, 14), DIREITA, bloqueioEm10_15)).toEqual([]);
      });
    });

    describe('passando por COLA', function() {
      it('deve encerrar movimento na posicao da COLA', function() {
        expect(mov.movimentarPersonagem(dezDez, DIREITA, colaEm10_15)).toEqual([movimentoPara(aPosicao(10, 15))]);
      });

      it('deve permitir fazer outro movimento a partir da COLA', function() {
        expect(mov.movimentarPersonagem(aPosicao(10, 15), BAIXO, colaEm10_15)).toEqual([movimentoPara(aPosicao(20, 15))]);
      });
    });

    describe('passando por ITEM', function() {
      it('deve gerar movimentos e coleta de item', function() {
        expect(mov.movimentarPersonagem(dezDez, DIREITA, itemEm10_15)).toEqual([movimentoPara(aPosicao(10, 15)), item(), movimentoPara(aPosicao(10, 20))]);
      });
    });

  });

});
