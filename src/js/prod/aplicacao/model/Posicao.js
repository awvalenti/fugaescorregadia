define([
  '_',
  'prod/libs-originais/assert'
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
  }

  Posicao.prototype.eh = function(linha, coluna) {
    return this._linha === linha && this._coluna == coluna;
  };

  Posicao.prototype.somar = function(direcao) {
    return this._repoPosicoes.obter(this._linha + direcao.linha, this._coluna + direcao.coluna);
  };

  Posicao.prototype.estaDentroDosLimites = function(quantidadeLinhas, quantidadeColunas) {
    return this._linha >= 0 && this._linha < quantidadeLinhas && this._coluna >= 0 && this._coluna < quantidadeColunas;
  };
  
  Posicao.prototype.linha = function() {
    return this._linha;
  };
  
  Posicao.prototype.coluna = function() {
    return this._coluna;
  };

  Posicao.prototype.toString = function() {
    return '(' + this._linha + ', ' + this._coluna + ')';
  };

  return Posicao;

});
