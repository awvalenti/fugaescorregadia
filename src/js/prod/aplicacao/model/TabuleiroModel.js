define([
  'prod/aplicacao/model/Elemento',
  'prod/aplicacao/model/Elemento/PERSONAGEM',
  '_'
],
function(
  Elemento,
  PERSONAGEM,
  _
) {
  'use strict';

  function TabuleiroModel(repoPosicoes, mapa) {
    this._repoPosicoes = repoPosicoes;
    this._matrizMapa = mapa.copiarMatriz();
  }

  TabuleiroModel.prototype.paraCada = function(funcoes) {
    _(this._matrizMapa).each(function(linha) {
      funcoes.inicioLinha();
      _(linha).each(funcoes.elemento, funcoes);
      funcoes.fimLinha();
    });
  };

  TabuleiroModel.prototype.elementoEm = function(posicao) {
    return this._matrizMapa[posicao.linha()][posicao.coluna()];
  };

  TabuleiroModel.prototype.posicaoPersonagem = function() {
    for (var i = 0; i < this._matrizMapa.length; ++i) {
      for (var j = 0; j < this._matrizMapa[i].length; ++j) {
        if (this._matrizMapa[i][j] === PERSONAGEM) return this._repoPosicoes.obter(i, j);
      }
    }
  };

  return TabuleiroModel;

});
