define([
  'spec/integracao/utils/TabuleiroViewHtmlTableSpecUtils',
  'prod/aplicacao/view/TabuleiroViewHtmlTable',
  'prod/aplicacao/model/Mapa',
  'prod/aplicacao/model/TabuleiroModel',
  'prod/aplicacao/model/RepoPosicoes',
  'prod/aplicacao/model/Elemento',
  'prod/aplicacao/model/Elemento/PERSONAGEM',
  'prod/aplicacao/model/Elemento/VAZIO',
  '_',
  '$'
],
function(
  TabuleiroViewHtmlTableSpecUtils,
  TabuleiroViewHtmlTable,
  Mapa,
  TabuleiroModel,
  RepoPosicoes,
  Elemento,
  PERSONAGEM,
  VAZIO,
  _,
  $
) {
  'use strict';

  describe('TabuleiroViewHtmlTable', function() {
    var repoPosicoes = null, view = null, $elementoRaiz = null;

    function elementoHtmlEm(linha, coluna) { return TabuleiroViewHtmlTableSpecUtils.obterElementoHtml($elementoRaiz, linha, coluna); }
    function elementoJogoEm(linha, coluna) { return TabuleiroViewHtmlTableSpecUtils.obterElementoJogo($elementoRaiz, linha, coluna); }
    function aPosicao(linha, coluna)       { return repoPosicoes.obter(linha, coluna); }

    beforeEach(function() {
      repoPosicoes = new RepoPosicoes();

      $elementoRaiz = $('<div>');
      view = new TabuleiroViewHtmlTable($elementoRaiz);
      view.desenharTabuleiroModel(new TabuleiroModel(repoPosicoes, new Mapa(2, 3,
        '_ i _' +
        '_ _ p' +
        ''
      )));
    });

    it('deve gerar um elemento <table> filho de $elementoRaiz', function() {
      expect($elementoRaiz.children('table').length).toBe(1);
    });

    it('esse elemento <table> deve possuir classe "tabuleiro"', function() {
      expect($elementoRaiz.children('table').hasClass('tabuleiro')).toBe(true);
    });

    describe('elementos de jogo gerados', function() {
      var $personagem = null;

      beforeEach(function() {
        $personagem = elementoHtmlEm(1, 2);
      });

      it('devem estar corretamente posicionados na tabela', function() {
        expect($personagem.length).toBe(1);
      });

      it('devem possuir classe css com mesmo nome do elemento de jogo', function() {
        expect($personagem.hasClass('PERSONAGEM')).toBe(true);
      });

      it('devem exibir caractere como representacao grafica', function() {
        expect($personagem.text()).toBe('p');
      });

    });

    describe('evento', function() {
      describe('de movimento', function() {
        it('deve apagar personagem na origem e posiciona-lo no destino', function() {
          view.reposicionarPersonagem(aPosicao(1, 2), aPosicao(1, 0));
          expect(elementoJogoEm(1, 2)).toBe(VAZIO);
          expect(elementoJogoEm(1, 0)).toBe(PERSONAGEM);
        });

      });

      describe('de item', function() {
        it('deve apagar item', function() {
          view.coletarItem(aPosicao(0, 1));
          expect(elementoJogoEm(0, 1)).toBe(VAZIO);
        });

      });

    });

  });

});
