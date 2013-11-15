define([
  'Movimentacao',
  'Posicao'
],
function(
  Movimentacao,
  Posicao
) {
  'use strict';

  describe('Movimentacao', function() {
    var mov = null;

    beforeEach(function() {
      mov = Movimentacao.paraTabuleiro(5, 5).comPersonagemEm(2, 2);
    });

    it('deve construir Movimentacao', function() {
      expect(mov).toBeTruthy();
      expect(mov.posicaoPersonagem()).toBe(Posicao(2, 2));
    });

    xit('deve permitir andar nas quatro direcoes', function() {
      mov.andarPara('DIREITA');
      expect(mov.posicaoPersonagem()).toBe(Posicao(2, 4));
    });
  });

});
