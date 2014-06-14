define([
  '_'
],
function(
  _
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
    var htmlTabela = '<table class="tabuleiro"><tbody>';
    _(matrizMapa).each(function(linha) {

      htmlTabela += '<tr>';
      _(linha).each(function(elementoJogo) {
        htmlTabela += '<td><span class="' + elementoJogo.name() + '">'
            + caracteresGraficos[elementoJogo] + '</span></td>';
      }, this);
      htmlTabela += '</tr>';

    }, this);

    htmlTabela += '</tbody></table>';

    this._$elementoRaiz.append(htmlTabela);
  };

  return MapaViewModoTexto;

});





























