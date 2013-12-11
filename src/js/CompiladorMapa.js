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

    if (stringMapa.length > quantidadeLinhas * quantidadeColunas) {
      throw new Error('Tamanho informado: ' + quantidadeLinhas + 'x' + quantidadeColunas + '. Tamanho encontrado: ' +
          Math.floor(stringMapa.length / quantidadeColunas) + 'x' + (stringMapa.length % quantidadeColunas + quantidadeColunas) + '.');
    }

    return _(quantidadeLinhas).times(function(linha) {
      return _(quantidadeColunas).times(function(coluna) {
        var indiceCaractere = linha * quantidadeColunas + coluna;

        if (indiceCaractere >= stringMapa.length) {
          throw new Error('Tamanho informado: ' + quantidadeLinhas + 'x' + quantidadeColunas + '. Tamanho encontrado: ' +
              (linha + 1) + 'x' + coluna + '.');
        }

        var caractere = stringMapa.charAt(indiceCaractere);
        var elemento = deCaractereParaElemento[caractere];

        if (!elemento) throw new Error('Caractere nao reconhecido: ' + caractere);

        return elemento;
      });
    });
  };

  return CompiladorMapa;

});
