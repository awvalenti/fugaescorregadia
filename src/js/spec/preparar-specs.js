define([
  'prod/aplicacao/Elemento',

  'spec/carregar-specs'
],
function(
  Elemento
) {
  'use strict';

  acrescentarMetodoJasmineToString(Elemento);

  function acrescentarMetodoJasmineToString(classe) {
    classe.prototype.jasmineToString = jasmineToString;
  }

  function jasmineToString() {
    return this.toString();
  }

});
