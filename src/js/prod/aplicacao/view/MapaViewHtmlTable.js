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

  function MapaViewHtmlTable($elementoRaiz) {
    this._$elementoRaiz = $elementoRaiz;
  }

  MapaViewHtmlTable.prototype.desenharMapaModel = function(mapaModel) {
    var htmlTabela = '<table class="tabuleiro"><tbody>';

    mapaModel.paraCada({
      inicioLinha: function() { htmlTabela += '<tr>'; },

      elemento: function(elementoJogo) {
        htmlTabela += '<td><span class="' + elementoJogo.name() + '">'
            + caracteresGraficos[elementoJogo] + '</span></td>';
      },

      fimLinha: function() { htmlTabela += '</tr>'; }
    });


    htmlTabela += '</tbody></table>';

    this._$elementoRaiz.append(htmlTabela);
  };

  return MapaViewHtmlTable;

});





























