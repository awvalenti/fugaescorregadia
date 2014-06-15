define([
  'prod/aplicacao/view/MapaViewHtmlTable',
  'prod/aplicacao/model/MapaModel',
  '$'
],
function(
  MapaViewHtmlTable,
  MapaModel,
  $
) {
  'use strict';

  describe('MapaViewHtmlTable', function() {
    var $tabela = null, view = null;

    function obterElemento(linha, coluna) {
      return $tabela.find('tbody tr').eq(linha).find('td').eq(coluna).find('span');
    }

    beforeEach(function() {
      var $elementoRaiz = $('<div>');
      view = new MapaViewHtmlTable($elementoRaiz);
      view.desenharMapaModel(new MapaModel(2, 3,
        '_ _ _' +
        '_ _ p' +
        ''
      ));
      $tabela = $elementoRaiz.children('table');
    });

    it('deve gerar tabela com classe "tabuleiro"', function() {
      expect($tabela.hasClass('tabuleiro')).toBe(true);
    });

    describe('elementos gerados', function() {
      var $personagem = null;

      beforeEach(function() {
        $personagem = obterElemento(1, 2);
      });

      it('devem estar corretamente posicionados na tabela', function() {
        expect($personagem.length).toBe(1);
      });

      it('devem possuir classe css com mesmo nome do elemento', function() {
        expect($personagem.hasClass('PERSONAGEM')).toBe(true);
      });

      it('devem exibir caractere como representacao grafica', function() {
        expect($personagem.text()).toBe('p');
      });

    });

    describe('evento', function() {
      describe('de movimento', function() {
        it('deve apagar personagem na origem e posicionar no destino', function() {
          view.processarResultadoMovimento(partindoDe(1, 2), [movimentoPara(1, 0)]);
          expect(obterElemento(1, 0)).toBe('PERSONAGEM');
        });
      });
    });

  });

});
