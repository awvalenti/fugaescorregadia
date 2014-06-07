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
    var $elemento = null, view = null;

    beforeEach(function() {
      $elemento = $('<div>');
      view = new MapaViewModoTexto($elemento);
    });

    describe('elementos gerados', function() {
      var $vazios = null, $personagem = null;

      beforeEach(function() {
        view.desenharMatrizMapa([[VAZIO, PERSONAGEM, VAZIO]]);
        $vazios = $elemento.find('.VAZIO');
        $personagem = $elemento.find('.PERSONAGEM');
      });

      it('devem possuir classe css com mesmo nome do elemento', function() {
        expect($vazios.length).toBe(2);
        expect($personagem.length).toBe(1);
      });

      it('devem possuir como texto um caractere representando-o graficamente', function() {
        expect($vazios.first().text()).toBe('_');
        expect($personagem.first().text()).toBe('p');
      });

    });
  });

});
