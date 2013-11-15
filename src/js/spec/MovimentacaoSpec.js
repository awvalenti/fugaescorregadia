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
    var mov = null, posicao = null;

    beforeEach(function() {
      posicao = Posicao.criarFabrica();
      mov = Movimentacao.paraTabuleiro(5, 5).comPersonagemEm(posicao(2, 2)).comDependencias({ posicao: posicao });
    });

    it('deve construir Movimentacao', function() {
      expect(mov).toBeTruthy();
      expect(mov.posicaoPersonagem()).toBe(posicao(2, 2));
    });

    it('deve permitir andar para BAIXO', function() {
      mov.andarPara(BAIXO);
      expect(mov.posicaoPersonagem()).toBe(posicao(4, 2));
    });

    it('deve permitir andar para CIMA', function() {
      mov.andarPara(CIMA);
      expect(mov.posicaoPersonagem()).toBe(posicao(0, 2));
    });

    it('deve permitir andar para DIREITA', function() {
      mov.andarPara(DIREITA);
      expect(mov.posicaoPersonagem()).toBe(posicao(2, 4));
    });

    it('deve permitir andar para ESQUERDA', function() {
      mov.andarPara(ESQUERDA);
      expect(mov.posicaoPersonagem()).toBe(posicao(2, 0));
    });

  });

});
