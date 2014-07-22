define([
  '_',
  'prod/aplicacao/model/Movimentacao',
  'prod/aplicacao/model/posicao/fabricarAPosicao',
  'prod/aplicacao/model/ResultadoMovimento',
  'prod/aplicacao/model/movimento/ResultadoMovimentoBuilder',
  'prod/aplicacao/model/Direcao/BAIXO',
  'prod/aplicacao/model/Direcao/CIMA',
  'prod/aplicacao/model/Direcao/DIREITA',
  'prod/aplicacao/model/Direcao/ESQUERDA',
  'prod/aplicacao/model/Elemento/VAZIO',
  'prod/aplicacao/model/Elemento/OBSTACULO',
  'prod/aplicacao/model/Elemento/COLA',
  'prod/aplicacao/model/Elemento/ITEM',
  'prod/aplicacao/model/Elemento/SETA_CIMA',
  'prod/aplicacao/model/Elemento/SETA_BAIXO'
],
function(
  _,
  Movimentacao,
  fabricarAPosicao,
  ResultadoMovimento,
  ResultadoMovimentoBuilder,
  BAIXO,
  CIMA,
  DIREITA,
  ESQUERDA,
  VAZIO,
  OBSTACULO,
  COLA,
  ITEM,
  SETA_CIMA,
  SETA_BAIXO
) {
  'use strict';

  function mapaSomenteCom(elemento) { return { elementoEm: function() { return elemento; } }; }

  function mapaVazioExcetoEm(linha, coluna, elementoQueTemLa) {
    return { elementoEm: function(posicao) { return posicao.eh(linha, coluna) ? elementoQueTemLa : VAZIO; } };
  }

  var mapaVazio       = mapaSomenteCom(VAZIO),
      bloqueioEm10_11 = mapaVazioExcetoEm(10, 11, OBSTACULO),
      bloqueioEm15_10 = mapaVazioExcetoEm(15, 10, OBSTACULO),
      colaEm10_10     = mapaVazioExcetoEm(10, 10, COLA),
      colaEm10_15     = mapaVazioExcetoEm(10, 15, COLA),
      itemEm10_15     = mapaVazioExcetoEm(10, 15, ITEM);

  describe('Movimentacao', function() {
    var dezDez = null, mov = null, aPosicao = null;

    beforeEach(function() {
      aPosicao = fabricarAPosicao();
      dezDez = aPosicao(10, 10);
      mov = new Movimentacao(21, 21);
    });

    function inicia() { return new ResultadoMovimentoBuilder(aPosicao).parteDe(10, 10); }

    function estaSequencia() { return new ResultadoMovimento(dezDez, _(arguments).toArray()); }

    describe('livre', function() {
      it('deve encerrar movimento uma posicao antes das extremidades do tabuleiro', function() {
        expect(mov.calcularMovimento(dezDez, BAIXO,    mapaVazio)).toEqual(inicia().vaiPara(20, 10).eTermina());
        expect(mov.calcularMovimento(dezDez, BAIXO,    mapaVazio)).toEqual(inicia().vaiPara(20, 10).eTermina());
        expect(mov.calcularMovimento(dezDez, CIMA,     mapaVazio)).toEqual(inicia().vaiPara( 0, 10).eTermina());
        expect(mov.calcularMovimento(dezDez, DIREITA,  mapaVazio)).toEqual(inicia().vaiPara(10, 20).eTermina());
        expect(mov.calcularMovimento(dezDez, ESQUERDA, mapaVazio)).toEqual(inicia().vaiPara(10,  0).eTermina());
      });
    });

    describe('atingindo um bloqueio no meio do caminho', function() {
      it('deve encerrar movimento uma posicao antes', function() {
        expect(mov.calcularMovimento(dezDez, BAIXO, bloqueioEm15_10)).toEqual(inicia().vaiPara(14, 10).eTermina());
      });
    });

    describe('bloqueada logo no inicio', function() {
      it('nao deve gerar nenhum movimento', function() {
        expect(mov.calcularMovimento(dezDez, DIREITA, bloqueioEm10_11)).toEqual(inicia().eTermina());
      });
    });

    describe('passando por COLA', function() {
      it('deve encerrar movimento na posicao da COLA', function() {
        expect(mov.calcularMovimento(dezDez, DIREITA, colaEm10_15)).toEqual(inicia().vaiPara(10, 15).eTermina());
      });

      it('deve permitir fazer outro movimento a partir da COLA', function() {
        expect(mov.calcularMovimento(dezDez, BAIXO, colaEm10_10)).toEqual(inicia().vaiPara(20, 10).eTermina());
      });
    });

    describe('passando por ITEM', function() {
      it('deve gerar movimentos e coleta de item', function() {
        expect(mov.calcularMovimento(dezDez, DIREITA, itemEm10_15)).toEqual(inicia().vaiPara(10, 15).pegaItem().vaiPara(10, 20).eTermina());
      });
    });

  });

});
