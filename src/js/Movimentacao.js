define([
  'assert'
],
function(
  assert
) {
  'use strict';

  function Movimentacao(params) {
    assert.args(params.posicao, 'function', params.posicaoPersonagem, 'object', params.largura, 'number', params.altura, 'number');

    this._posicao = params.posicao;
    this._largura = params.largura;
    this._altura = params.altura;
    this._posicaoPersonagem = params.posicaoPersonagem;
  }

  Movimentacao.prototype.posicaoPersonagem = function() {
    return this._posicaoPersonagem;
  };

  Movimentacao.prototype.andarPara = function(direcao) {
    while (this._posicaoPersonagem.somar(direcao).estaContidaEm(this._altura, this._largura)) {
      this._posicaoPersonagem = this._posicaoPersonagem.somar(direcao);
    }
  };

  function MovimentacaoFactory() {}

  MovimentacaoFactory.paraTabuleiro = function(largura, altura) {
    return {
      comPersonagemEm: function(posicaoPersonagem) {
        return {
          comDependencias: function(dependencias) {
            return new Movimentacao({
              posicao: dependencias.posicao,
              posicaoPersonagem: posicaoPersonagem,
              largura: largura,
              altura: altura
            });
          }
        }
      }
    };
  };

  return MovimentacaoFactory;

});
