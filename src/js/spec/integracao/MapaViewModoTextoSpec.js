define([
  'prod/aplicacao/Elemento/COLA',
  'prod/aplicacao/Elemento/OBSTACULO',
  'prod/aplicacao/Elemento/PERSONAGEM',
  'prod/aplicacao/Elemento/SETA_BAIXO',
  'prod/aplicacao/Elemento/SETA_CIMA',
  'prod/aplicacao/Elemento/SETA_DIREITA',
  'prod/aplicacao/Elemento/SETA_ESQUERDA',
  'prod/aplicacao/Elemento/VAZIO',
  'prod/aplicacao/Elemento/ITEM',
  'prod/aplicacao/MapaViewModoTexto',
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
  MapaViewModoTexto,
  $
) {
  'use strict';

  describe('MapaViewModoTexto', function() {
    var $tabela = null;

    beforeEach(function() {
      var $elementoRaiz = $('<div>');
      new MapaViewModoTexto($elementoRaiz).desenharMatrizMapa([
        [VAZIO, VAZIO, VAZIO     ],
        [VAZIO, VAZIO, PERSONAGEM]
      ]);
      $tabela = $elementoRaiz.children('table');
    });

    it('deve gerar tabela com classe "tabuleiro"', function() {
      expect($tabela.hasClass('tabuleiro')).toBe(true);
    });

    describe('elementos gerados', function() {
      var $personagem = null;

      beforeEach(function() {
        $personagem = $tabela.find('tbody tr').eq(1).find('td').eq(2).find('span');
      });

      it('devem estar corretamente posicionados na tabela', function() {
        expect($personagem.length).toBe(1);
      });

      it('devem possuir classe css com mesmo nome do elemento', function() {
        expect($personagem.hasClass('PERSONAGEM')).toBe(true);
      });

      it('devem possuir como texto um caractere representando-os graficamente', function() {
        expect($personagem.text()).toBe('p');
      });

    });
  });

});
