define([
  '_'
],
function(
  _
) {
  'use strict';

  function MapaViewHtmlTable($elementoRaiz) {
    this._$elementoRaiz = $elementoRaiz;
  }

  MapaViewHtmlTable.prototype.desenharMapaModel = function(mapaModel) {
    var htmlTabela = '<table class="tabuleiro"><tbody>';

    mapaModel.paraCada({
      inicioLinha: function() { htmlTabela += '<tr>'; },

      elemento: function(elementoJogo) {
        htmlTabela += '<td>' + gerarStringDoSpan(elementoJogo) + '</td>';
      },

      fimLinha: function() { htmlTabela += '</tr>'; }
    });


    htmlTabela += '</tbody></table>';

    this._$elementoRaiz.append(htmlTabela);
  };
  
  MapaViewHtmlTable.prototype.movimentarPersonagem = function(origem, destino) {
    this._alterarElementoHtml(origem, 'NADA');
    this._alterarElementoHtml(destino, 'PERSONAGEM');
  };
  
  MapaViewHtmlTable.prototype._alterarElementoHtml = function(posicao, novoElementoJogo) {
    this._$elementoRaiz
        .find('tr').eq(posicao.linha())
        .find('td').eq(posicao.coluna())
        .children('span').attr('class', novoElementoJogo);
  };
  
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
  
  function gerarStringDoSpan(elementoJogo) {
    return '<span class="' + elementoJogo.name() + '">' + caracteresGraficos[elementoJogo] + '</span>';
  }
  
  return MapaViewHtmlTable;

});
