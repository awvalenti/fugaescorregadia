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

    describe('livre', function() {
      it('deve permitir andar para as quatro direcoes', function() {
        expect(mov.movimentarPersonagem(doisDois, BAIXO)).toBe(posicao(4, 2));
        expect(mov.movimentarPersonagem(doisDois, CIMA)).toBe(posicao(0, 2));
        expect(mov.movimentarPersonagem(doisDois, DIREITA)).toBe(posicao(2, 4));
        expect(mov.movimentarPersonagem(doisDois, ESQUERDA)).toBe(posicao(2, 0));
      });
    });
  });

});
