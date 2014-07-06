define([
  '_',
  'prod/aplicacao/model/Movimentacao',
  'prod/aplicacao/model/RepoPosicoes',
  'prod/aplicacao/model/ResultadoMovimento',
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
  ResultadoMovimento,
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
  function bloqueioEm10_11(posicao) { return posicao.eh(10, 11) ? OBSTACULO : VAZIO; }
  function bloqueioEm15_10(posicao) { return posicao.eh(15, 10) ? OBSTACULO : VAZIO; }
  function colaEm10_10(posicao)     { return posicao.eh(10, 10) ? COLA : VAZIO; }
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

    function estaSequencia() {
      return new ResultadoMovimento(dezDez, _(arguments).toArray());
    }

    describe('livre', function() {
      it('deve encerrar movimento uma posicao antes das extremidades do tabuleiro', function() {
        expect(mov.calcularMovimento(dezDez, BAIXO,    tabuleiroVazio)).toEqual(estaSequencia(movimentoPara(aPosicao(20, 10))));
        expect(mov.calcularMovimento(dezDez, CIMA,     tabuleiroVazio)).toEqual(estaSequencia(movimentoPara(aPosicao( 0, 10))));
        expect(mov.calcularMovimento(dezDez, DIREITA,  tabuleiroVazio)).toEqual(estaSequencia(movimentoPara(aPosicao(10, 20))));
        expect(mov.calcularMovimento(dezDez, ESQUERDA, tabuleiroVazio)).toEqual(estaSequencia(movimentoPara(aPosicao(10,  0))));
      });
    });

    describe('atingindo um bloqueio no meio do caminho', function() {
      it('deve encerrar movimento uma posicao antes', function() {
        expect(mov.calcularMovimento(dezDez, BAIXO, bloqueioEm15_10)).toEqual(estaSequencia(movimentoPara(aPosicao(14, 10))));
      });
    });

    describe('bloqueada logo no inicio', function() {
      it('nao deve gerar nenhum movimento', function() {
        expect(mov.calcularMovimento(dezDez, DIREITA, bloqueioEm10_11)).toEqual(estaSequencia());
      });
    });

    describe('passando por COLA', function() {
      it('deve encerrar movimento na posicao da COLA', function() {
        expect(mov.calcularMovimento(dezDez, DIREITA, colaEm10_15)).toEqual(estaSequencia(movimentoPara(aPosicao(10, 15))));
      });

      it('deve permitir fazer outro movimento a partir da COLA', function() {
        expect(mov.calcularMovimento(dezDez, BAIXO, colaEm10_10)).toEqual(estaSequencia(movimentoPara(aPosicao(20, 10))));
      });
    });

    describe('passando por ITEM', function() {
      it('deve gerar movimentos e coleta de item', function() {
        expect(mov.calcularMovimento(dezDez, DIREITA, itemEm10_15)).toEqual(estaSequencia(movimentoPara(aPosicao(10, 15)), item(), movimentoPara(aPosicao(10, 20))));
      });
    });

  });

});
