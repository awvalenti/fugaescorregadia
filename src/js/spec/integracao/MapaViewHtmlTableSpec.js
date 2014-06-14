define([
  'prod/aplicacao/model/Elemento/COLA',
  'prod/aplicacao/model/Elemento/OBSTACULO',
  'prod/aplicacao/model/Elemento/PERSONAGEM',
  'prod/aplicacao/model/Elemento/SETA_BAIXO',
  'prod/aplicacao/model/Elemento/SETA_CIMA',
  'prod/aplicacao/model/Elemento/SETA_DIREITA',
  'prod/aplicacao/model/Elemento/SETA_ESQUERDA',
  'prod/aplicacao/model/Elemento/VAZIO',
  'prod/aplicacao/model/Elemento/ITEM',
  'prod/aplicacao/view/MapaViewHtmlTable',
  'prod/aplicacao/model/FabricaEventos',
  'prod/aplicacao/model/MapaModel',
  '$'
],
function(
  COLA,
  OBSTACULO,
  PERSONAGEM,
  SETA_BAIXO,
  SETA_CIMA,
  SETA_DIREITA,
  SETA_ESQUERDA,
  VAZIO,
  ITEM,
  MapaViewHtmlTable,
  FabricaEventos,
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
      view.desenharMapaModel(new MapaModel([
        [VAZIO, VAZIO, VAZIO     ],
        [VAZIO, VAZIO, PERSONAGEM]
      ]));
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
          view.processarMovimento(aPosicao(1, 2), aPosicao(1, 0));
          expect($tabela.find('tbody tr').eq(1).find('td').eq(0).find('span').length).toBe(1);
        });
      });
    });

  });

});
