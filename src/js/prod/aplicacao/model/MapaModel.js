define([
  '_',
  'prod/libs-originais/assert'
],
function(
  _,
  assert
) {
  'use strict';

  function MapaModel(matrizMapa) {
    this._matrizMapa = matrizMapa;
  }

  MapaModel.prototype.paraCada = function(funcoes) {
    _(this._matrizMapa).each(function(linha) {
      funcoes.linha();
      _(linha).each(function(elemento) {
        funcoes.elemento(elemento);
      });
    });
  };

  return MapaModel;

});
