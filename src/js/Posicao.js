define([
  'lib/non-amd/underscore',
  'assert'
],
function(
  _,
  assert
) {
  'use strict';

  function Posicao(linha, coluna, repoPosicoes) {
    this._linha = linha;
    this._coluna = coluna;
    this._repoPosicoes = repoPosicoes;

    this._tornarPropriedadeRepoPosicoesNaoEnumeravel();
  }

  Posicao.prototype.somar = function(direcao) {
    return this._repoPosicoes.obter(this._linha + direcao.linha, this._coluna + direcao.coluna);
  };

  Posicao.prototype.estaDentroDosLimites = function(quantidadeLinhas, quantidadeColunas) {
    return this._linha >= 0 && this._linha < quantidadeLinhas && this._coluna >= 0 && this._coluna < quantidadeColunas;
  };

  Posicao.prototype._tornarPropriedadeRepoPosicoesNaoEnumeravel = function() {
    // Isto serve para evitar mensagens de erro gigantes nas specs. O certo seria simplesmente sobrepor toString, mas nao funcionou.

    if (typeof Object !== 'undefined' && typeof Object.defineProperty === 'function') {
      Object.defineProperty(this, '_repoPosicoes', { value: this._repoPosicoes, enumerable: false });
    }
  };

  return Posicao;

});
