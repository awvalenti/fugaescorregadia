define([
  'prod/aplicacao/model/Elemento',
  'prod/aplicacao/model/Elemento/PERSONAGEM',
  'prod/aplicacao/model/Elemento/VAZIO',
  'prod/aplicacao/model/Direcao/ESQUERDA',
  '_'
],
function(
  Elemento,
  PERSONAGEM,
  VAZIO,
  ESQUERDA,
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
    var resultadoMovimento = this._movimentacao.calcularMovimento(this._posicaoPersonagem(), direcao, this);

    resultadoMovimento.paraCadaEvento({
      movimento: function(origem, destino) {
        this._alterarElemento(origem, VAZIO);
        this._alterarElemento(destino, PERSONAGEM);
      },
      item:      function(posicao)         { ; }
    }, this);

    return resultadoMovimento;
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

  TabuleiroModel.prototype._alterarElemento = function(posicao, novoElemento) {
    this._matrizMapa[posicao.linha()][posicao.coluna()] = novoElemento;
  };

  return TabuleiroModel;

});
