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

  function TabuleiroModel(repoPosicoes, mapaInicial, movimentacao) {
    this._repoPosicoes = repoPosicoes;
    this._matrizMapa = mapaInicial.copiarMatriz();
    this._movimentacao = movimentacao;
  }

  TabuleiroModel.prototype.paraCada = function(funcoes) {
    _(this._matrizMapa).each(function(linha) {
      funcoes.inicioLinha();
      _(linha).each(funcoes.elemento, funcoes);
      funcoes.fimLinha();
    });
  };

  TabuleiroModel.prototype.executarMovimento = function(direcao) {
    return this._movimentacao.calcularMovimento(this._posicaoPersonagem(), direcao, this);
  };

  TabuleiroModel.prototype.elementoEm = function(posicao) {
    return this._matrizMapa[posicao.linha()][posicao.coluna()];
  };

  TabuleiroModel.prototype._posicaoPersonagem = function() {
    for (var i = 0; i < this._matrizMapa.length; ++i) {
      for (var j = 0; j < this._matrizMapa[i].length; ++j) {
        if (this._matrizMapa[i][j] === PERSONAGEM) return this._repoPosicoes.obter(i, j);
      }
    }
  };

  return TabuleiroModel;

});
