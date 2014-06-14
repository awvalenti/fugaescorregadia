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
      funcoes.inicioLinha();
      _(linha).each(funcoes.elemento);
      funcoes.fimLinha();
    });
  };

  return MapaModel;

});
