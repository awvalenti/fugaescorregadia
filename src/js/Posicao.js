define([
  'assert'
],
function(
  assert
) {

  var CACHE = {};

  function PosicaoEmCache(linha, coluna) {
    assert.args(linha, 'number', coluna, 'number');

    if (!(linha in CACHE)) CACHE[linha] = {};
    if (!(coluna in CACHE[linha])) CACHE[linha][coluna] = { linha: linha, coluna: coluna };

    return CACHE[linha][coluna];
  }

  function Posicao(linha, coluna) {
    return PosicaoEmCache(linha, coluna);
  }

  return Posicao;

});
