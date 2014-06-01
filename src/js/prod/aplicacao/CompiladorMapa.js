define([
  '_',
  'prod/aplicacao/Elemento',
],
function(
  _,
  Elemento
) {
  'use strict';

  function CompiladorMapa() {
  }

  CompiladorMapa.prototype.compilar = function(quantidadeLinhas, quantidadeColunas, stringMapa) {
    stringMapa = stringMapa.trim().replace(/\s/g, '');

    var tamanhoEsperado = quantidadeLinhas * quantidadeColunas,
        tamanhoEncontrado = stringMapa.length;

    if (tamanhoEncontrado !== tamanhoEsperado) {
      throw new Error('Esperado: ' + tamanhoEsperado + ' elemento(s). Encontrado: ' + tamanhoEncontrado + ' elemento(s).');
    }

    return _(quantidadeLinhas).times(function(linha) {
      return _(quantidadeColunas).times(function(coluna) {
        return Elemento.comCaractere(stringMapa.charAt(linha * quantidadeColunas + coluna));
      });
    });
  };

  return CompiladorMapa;

});
