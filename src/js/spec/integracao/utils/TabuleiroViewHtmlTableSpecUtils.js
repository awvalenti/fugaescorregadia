define([
  'prod/aplicacao/model/Elemento'
],
function(
  Elemento
) {
  'use strict';

  return {
    obterElementoHtml: function($elementoRaiz, linha, coluna) {
      return $elementoRaiz.children('table').children('tbody').children('tr').eq(linha).find('td').eq(coluna).find('span');
    },

    obterElementoJogo: function($elementoRaiz, linha, coluna) {
      return Elemento.forName(this.obterElementoHtml($elementoRaiz, linha, coluna).attr('class'));
    }

  };

});