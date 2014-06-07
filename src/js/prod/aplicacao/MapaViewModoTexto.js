define([
  '_',
  '$'
],
function(
  _,
  $
) {
  'use strict';

  var caracteresGraficos = {
    VAZIO:         '_',
    OBSTACULO:     'o',
    PERSONAGEM:    'p',
    SETA_CIMA:     '^',
    SETA_BAIXO:    'v',
    SETA_ESQUERDA: '[',
    SETA_DIREITA:  ']',
    COLA:          'c',
    ITEM:          'i'
  };

  function MapaViewModoTexto($elementoRaiz) {
    this._$elementoRaiz = $elementoRaiz;
  }

  MapaViewModoTexto.prototype.desenharMatrizMapa = function(matrizMapa) {
    _(matrizMapa).each(function(linha) {
      _(linha).each(function(elementoJogo) {
        this._$elementoRaiz.append(
            $('<span>')
              .addClass(elementoJogo.name())
              .text(caracteresGraficos[elementoJogo])
        );
      }, this);
    }, this);
  };

  return MapaViewModoTexto;

});
