define([
  'Movimentacao',
  'Posicao',
  'Direcao/BAIXO',
  'Direcao/CIMA',
  'Direcao/DIREITA',
  'Direcao/ESQUERDA',
],
function(
  Movimentacao,
  Posicao,
  BAIXO,
  CIMA,
  DIREITA,
  ESQUERDA
) {
  'use strict';

  describe('Movimentacao', function() {
    var mov = null, posicao = null, doisDois = null;

    beforeEach(function() {
      posicao = Posicao.criarFabrica();
      doisDois = posicao(2, 2);
      mov = new Movimentacao({ largura: 5, altura: 5, posicao: posicao });
    });

    it('deve permitir andar para BAIXO', function() {
      expect(mov.movimentarPersonagem(doisDois, BAIXO)).toBe(posicao(4, 2));
    });

    it('deve permitir andar para CIMA', function() {
      expect(mov.movimentarPersonagem(doisDois, CIMA)).toBe(posicao(0, 2));
    });

    it('deve permitir andar para DIREITA', function() {
      expect(mov.movimentarPersonagem(doisDois, DIREITA)).toBe(posicao(2, 4));
    });

    it('deve permitir andar para ESQUERDA', function() {
      expect(mov.movimentarPersonagem(doisDois, ESQUERDA)).toBe(posicao(2, 0));
    });

  });

});
