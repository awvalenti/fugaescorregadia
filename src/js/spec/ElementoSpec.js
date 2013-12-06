define([
  'Elemento/OBSTACULO',
  'Elemento/SETA_BAIXO',
  'Elemento/SETA_CIMA',
  'Elemento/VAZIO',
  'Direcao/BAIXO',
  'Direcao/CIMA',
  'Direcao/DIREITA',
  'Direcao/ESQUERDA',
],
function(
  OBSTACULO,
  SETA_BAIXO,
  SETA_CIMA,
  VAZIO,
  BAIXO,
  CIMA,
  DIREITA,
  ESQUERDA
) {
  'use strict';

  describe('Elemento', function() {
    describe('VAZIO', function() {
      it('deve permitir passagem para todas as direcoes', function() {
        expect(VAZIO.permitePassagemPara(CIMA)).toBe(true);
        expect(VAZIO.permitePassagemPara(BAIXO)).toBe(true);
        expect(VAZIO.permitePassagemPara(ESQUERDA)).toBe(true);
        expect(VAZIO.permitePassagemPara(DIREITA)).toBe(true);
      });
    });

    describe('OBSTACULO', function() {
      it('deve proibir passagem para todas as direcoes', function() {
        expect(OBSTACULO.permitePassagemPara(CIMA)).toBe(false);
        expect(OBSTACULO.permitePassagemPara(BAIXO)).toBe(false);
        expect(OBSTACULO.permitePassagemPara(ESQUERDA)).toBe(false);
        expect(OBSTACULO.permitePassagemPara(DIREITA)).toBe(false);
      });
    });

    describe('SETA_CIMA', function() {
      it('deve permitir passagem para CIMA', function() {
        expect(SETA_CIMA.permitePassagemPara(CIMA)).toBe(true);
      });

      it('deve proibir passagem para outras direcoes', function() {
        expect(SETA_CIMA.permitePassagemPara(BAIXO)).toBe(false);
        expect(SETA_CIMA.permitePassagemPara(ESQUERDA)).toBe(false);
        expect(SETA_CIMA.permitePassagemPara(DIREITA)).toBe(false);
      });
    });

    describe('SETA_BAIXO', function() {
      it('deve permitir passagem para BAIXO', function() {
        expect(SETA_BAIXO.permitePassagemPara(BAIXO)).toBe(true);
      });

      it('deve proibir passagem para outras direcoes', function() {
        expect(SETA_BAIXO.permitePassagemPara(CIMA)).toBe(false);
        expect(SETA_BAIXO.permitePassagemPara(ESQUERDA)).toBe(false);
        expect(SETA_BAIXO.permitePassagemPara(DIREITA)).toBe(false);
      });
    });

  });

});
