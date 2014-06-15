define([
  '_',
  'prod/aplicacao/model/Elemento'
],
function(
  _,
  Elemento
) {
  'use strict';

  function MapaModel(quantidadeLinhas, quantidadeColunas, stringMapa) {
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

  MapaModel.prototype.paraCada = function(funcoes) {
    _(this._matrizMapa).each(function(linha) {
      funcoes.inicioLinha();
      _(linha).each(funcoes.elemento, funcoes);
      funcoes.fimLinha();
    });
  };

  return MapaModel;

});
