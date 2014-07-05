define([
  '_',
  'prod/aplicacao/model/Elemento'
],
function(
  _,
  Elemento
) {
  'use strict';

  function Mapa(quantidadeLinhas, quantidadeColunas, stringMapa) {
    stringMapa = stringMapa.trim().replace(/\s/g, '');

    var tamanhoEsperado = quantidadeLinhas * quantidadeColunas,
        tamanhoEncontrado = stringMapa.length;

    if (tamanhoEncontrado !== tamanhoEsperado) {
      throw new Error('Esperado: ' + tamanhoEsperado + ' elemento(s). Encontrado: ' + tamanhoEncontrado + ' elemento(s).');
    }

    this._matrizMapa = _(quantidadeLinhas).times(function(linha) {
      return _(quantidadeColunas).times(function(coluna) {
        return Elemento.comCaractere(stringMapa.charAt(linha * quantidadeColunas + coluna));
      });
    });
  }

  Mapa.prototype.copiarMatriz = function() {
    return _(this._matrizMapa).map(function(linha) {
      return linha.slice();
    });
  };

  return Mapa;

});
