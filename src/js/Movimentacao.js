define([
  'Posicao'
],
function(
  Posicao
) {

  function Movimentacao(largura, altura, linha, coluna) {
  }

  Movimentacao.prototype.posicaoPersonagem = function() {
    return Posicao(2, 2);
  };

  function MovimentacaoBuilder() {}

  MovimentacaoBuilder.paraTabuleiro = function(largura, altura) {
    return {
      comPersonagemEm: function(linha, coluna) {
        return new Movimentacao(largura, altura, linha, coluna);
      }
    };
  };

  return MovimentacaoBuilder;

});
