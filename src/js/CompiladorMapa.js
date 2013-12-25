define([
  'lib/non-amd/underscore',
  'Elemento/COLA',
  'Elemento/OBSTACULO',
  'Elemento/SETA_BAIXO',
  'Elemento/SETA_CIMA',
  'Elemento/SETA_DIREITA',
  'Elemento/SETA_ESQUERDA',
  'Elemento/VAZIO',
  'Elemento/ITEM',
],
function(
  _,
  COLA,
  OBSTACULO,
  SETA_BAIXO,
  SETA_CIMA,
  SETA_DIREITA,
  SETA_ESQUERDA,
  VAZIO,
  ITEM
) {
  'use strict';

  function CompiladorMapa() {
  }

  CompiladorMapa.prototype.compilar = function(stringMapa, quantidadeLinhas, quantidadeColunas) {
    var deCaractereParaElemento = {
      '_': VAZIO,
      'o': OBSTACULO,
      'v': SETA_BAIXO
    };

    stringMapa = stringMapa.trim().replace(/\s/g, '');

    var tamanhoEsperado = quantidadeLinhas * quantidadeColunas,
        tamanhoEncontrado = stringMapa.length;

    if (tamanhoEncontrado !== tamanhoEsperado) {
      throw new Error('Esperado: ' + tamanhoEsperado + ' elemento(s). Encontrado: ' + tamanhoEncontrado + ' elemento(s).');
    }

    return _(quantidadeLinhas).times(function(linha) {
      return _(quantidadeColunas).times(function(coluna) {
        var caractere = stringMapa.charAt(linha * quantidadeColunas + coluna);
        var elemento = deCaractereParaElemento[caractere];

        if (!elemento) throw new Error('Caractere nao reconhecido: ' + caractere);

        return elemento;
      });
    });
  };

  return CompiladorMapa;

});
