define([
  'prod/aplicacao/model/Elemento/PERSONAGEM',
  'prod/aplicacao/model/Elemento/VAZIO',
  '_'
],
function(
  PERSONAGEM,
  VAZIO,
  _
) {
  'use strict';

  function TabuleiroViewHtmlTable($elementoRaiz) {
    this._$elementoRaiz = $elementoRaiz;
  }

  TabuleiroViewHtmlTable.prototype.desenharTabuleiroModel = function(tabuleiroModel) {
    var htmlTabela = '<table class="tabuleiro"><tbody>';

    tabuleiroModel.paraCada({
      inicioLinha: function() { htmlTabela += '<tr>'; },

      elemento: function(elementoJogo) {
        htmlTabela += '<td>' + gerarStringDoSpan(elementoJogo) + '</td>';
      },

      fimLinha: function() { htmlTabela += '</tr>'; }
    });


    htmlTabela += '</tbody></table>';

    this._$elementoRaiz.append(htmlTabela);
  };

  TabuleiroViewHtmlTable.prototype.reposicionarPersonagem = function(origem, destino) {
    this._alterarElementoHtml(origem, VAZIO);
    this._alterarElementoHtml(destino, PERSONAGEM);
  };

  TabuleiroViewHtmlTable.prototype.coletarItem = function(posicao) {
    this._alterarElementoHtml(posicao, VAZIO);
  };

  TabuleiroViewHtmlTable.prototype._alterarElementoHtml = function(posicao, novoElementoJogo) {
    this._$elementoRaiz
        .find('tr').eq(posicao.linha())
        .find('td').eq(posicao.coluna())
        .children('span').attr('class', novoElementoJogo);
  };

  var CARACTERES_GRAFICOS = {
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
    return '<span class="' + elementoJogo.name() + '">' + CARACTERES_GRAFICOS[elementoJogo] + '</span>';
  }

  return TabuleiroViewHtmlTable;

});
