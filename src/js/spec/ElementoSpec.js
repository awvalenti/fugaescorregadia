define([
  'Elemento/OBSTACULO',
  'Elemento/SETA_BAIXO',
  'Elemento/SETA_CIMA',
  'Elemento/SETA_DIREITA',
  'Elemento/SETA_ESQUERDA',
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
  SETA_DIREITA,
  SETA_ESQUERDA,
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


    describe('SETA_ESQUERDA', function() {
      it('deve permitir passagem para ESQUERDA', function() {
        expect(SETA_ESQUERDA.permitePassagemPara(ESQUERDA)).toBe(true);
      });

      it('deve proibir passagem para outras direcoes', function() {
        expect(SETA_ESQUERDA.permitePassagemPara(CIMA)).toBe(false);
        expect(SETA_ESQUERDA.permitePassagemPara(BAIXO)).toBe(false);
        expect(SETA_ESQUERDA.permitePassagemPara(DIREITA)).toBe(false);
      });
    });

    describe('SETA_DIREITA', function() {
      it('deve permitir passagem para DIREITA', function() {
        expect(SETA_DIREITA.permitePassagemPara(DIREITA)).toBe(true);
      });

      it('deve proibir passagem para outras direcoes', function() {
        expect(SETA_DIREITA.permitePassagemPara(CIMA)).toBe(false);
        expect(SETA_DIREITA.permitePassagemPara(BAIXO)).toBe(false);
        expect(SETA_DIREITA.permitePassagemPara(ESQUERDA)).toBe(false);
      });
    });

  });

});
