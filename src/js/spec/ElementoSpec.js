define([
  'Elemento/COLA',
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
  COLA,
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
        expect(VAZIO.permiteEntrarVindoDe(CIMA)).toBe(true);
        expect(VAZIO.permiteEntrarVindoDe(BAIXO)).toBe(true);
        expect(VAZIO.permiteEntrarVindoDe(ESQUERDA)).toBe(true);
        expect(VAZIO.permiteEntrarVindoDe(DIREITA)).toBe(true);
        expect(VAZIO.permiteSair()).toBe(true);
      });
    });

    describe('OBSTACULO', function() {
      it('deve proibir passagem para todas as direcoes', function() {
        expect(OBSTACULO.permiteEntrarVindoDe(CIMA)).toBe(false);
        expect(OBSTACULO.permiteEntrarVindoDe(BAIXO)).toBe(false);
        expect(OBSTACULO.permiteEntrarVindoDe(ESQUERDA)).toBe(false);
        expect(OBSTACULO.permiteEntrarVindoDe(DIREITA)).toBe(false);
      });
    });

    describe('SETA_CIMA', function() {
      it('deve permitir passagem para CIMA', function() {
        expect(SETA_CIMA.permiteEntrarVindoDe(CIMA)).toBe(true);
      });

      it('deve proibir passagem para outras direcoes', function() {
        expect(SETA_CIMA.permiteEntrarVindoDe(BAIXO)).toBe(false);
        expect(SETA_CIMA.permiteEntrarVindoDe(ESQUERDA)).toBe(false);
        expect(SETA_CIMA.permiteEntrarVindoDe(DIREITA)).toBe(false);
      });
    });

    describe('SETA_BAIXO', function() {
      it('deve permitir passagem para BAIXO', function() {
        expect(SETA_BAIXO.permiteEntrarVindoDe(BAIXO)).toBe(true);
      });

      it('deve proibir passagem para outras direcoes', function() {
        expect(SETA_BAIXO.permiteEntrarVindoDe(CIMA)).toBe(false);
        expect(SETA_BAIXO.permiteEntrarVindoDe(ESQUERDA)).toBe(false);
        expect(SETA_BAIXO.permiteEntrarVindoDe(DIREITA)).toBe(false);
      });
    });


    describe('SETA_ESQUERDA', function() {
      it('deve permitir passagem para ESQUERDA', function() {
        expect(SETA_ESQUERDA.permiteEntrarVindoDe(ESQUERDA)).toBe(true);
      });

      it('deve proibir passagem para outras direcoes', function() {
        expect(SETA_ESQUERDA.permiteEntrarVindoDe(CIMA)).toBe(false);
        expect(SETA_ESQUERDA.permiteEntrarVindoDe(BAIXO)).toBe(false);
        expect(SETA_ESQUERDA.permiteEntrarVindoDe(DIREITA)).toBe(false);
      });
    });

    describe('SETA_DIREITA', function() {
      it('deve permitir passagem para DIREITA', function() {
        expect(SETA_DIREITA.permiteEntrarVindoDe(DIREITA)).toBe(true);
      });

      it('deve proibir passagem para outras direcoes', function() {
        expect(SETA_DIREITA.permiteEntrarVindoDe(CIMA)).toBe(false);
        expect(SETA_DIREITA.permiteEntrarVindoDe(BAIXO)).toBe(false);
        expect(SETA_DIREITA.permiteEntrarVindoDe(ESQUERDA)).toBe(false);
      });
    });

    describe('COLA', function() {
      it('deve permitir entrar', function() {
        expect(COLA.permiteEntrarVindoDe(CIMA)).toBe(true);
        expect(COLA.permiteEntrarVindoDe(BAIXO)).toBe(true);
        expect(COLA.permiteEntrarVindoDe(ESQUERDA)).toBe(true);
        expect(COLA.permiteEntrarVindoDe(DIREITA)).toBe(true);
      });

      it('deve bloquear movimento apos entrar', function() {
        expect(COLA.permiteSair()).toBe(false);
      });
    });

  });

});
