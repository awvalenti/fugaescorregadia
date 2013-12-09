define([
  'Elemento/COLA',
  'Elemento/OBSTACULO',
  'Elemento/SETA_BAIXO',
  'Elemento/SETA_CIMA',
  'Elemento/SETA_DIREITA',
  'Elemento/SETA_ESQUERDA',
  'Elemento/VAZIO',
  'Elemento/ITEM',
  'Direcao/BAIXO',
  'Direcao/CIMA',
  'Direcao/DIREITA',
  'Direcao/ESQUERDA',
  'spec/spec-helper/DirecaoMatcher/ALGUMA_DIRECAO',
  'spec/spec-helper/DirecaoMatcher/TODAS_DIRECOES',
],
function(
  COLA,
  OBSTACULO,
  SETA_BAIXO,
  SETA_CIMA,
  SETA_DIREITA,
  SETA_ESQUERDA,
  VAZIO,
  ITEM,
  BAIXO,
  CIMA,
  DIREITA,
  ESQUERDA,
  ALGUMA_DIRECAO,
  TODAS_DIRECOES
) {
  'use strict';

  describe('Elemento', function() {
    describe('VAZIO', function() {
      it('deve permitir passagem para todas as direcoes', function() {
        expect(VAZIO.permiteEntrarVindoDe(TODAS_DIRECOES)).toBe(true);
      });
    });

    describe('OBSTACULO', function() {
      it('deve bloquear passagem para todas as direcoes', function() {
        expect(OBSTACULO.permiteEntrarVindoDe(ALGUMA_DIRECAO)).toBe(false);
      });
    });

    describe('SETA_CIMA', function() {
      it('deve permitir passagem somente para CIMA', function() {
        expect(SETA_CIMA.permiteEntrarVindoDe(CIMA)).toBe(true);
        expect(SETA_CIMA.permiteEntrarVindoDe(ALGUMA_DIRECAO.exceto(CIMA))).toBe(false);
      });
    });

    describe('SETA_BAIXO', function() {
      it('deve permitir passagem somente para BAIXO', function() {
        expect(SETA_BAIXO.permiteEntrarVindoDe(BAIXO)).toBe(true);
        expect(SETA_BAIXO.permiteEntrarVindoDe(ALGUMA_DIRECAO.exceto(BAIXO))).toBe(false);
      });
    });

    describe('SETA_ESQUERDA', function() {
      it('deve permitir passagem somente para ESQUERDA', function() {
        expect(SETA_ESQUERDA.permiteEntrarVindoDe(ESQUERDA)).toBe(true);
        expect(SETA_ESQUERDA.permiteEntrarVindoDe(ALGUMA_DIRECAO.exceto(ESQUERDA))).toBe(false);
      });
    });

    describe('SETA_DIREITA', function() {
      it('deve permitir passagem somente para DIREITA', function() {
        expect(SETA_DIREITA.permiteEntrarVindoDe(DIREITA)).toBe(true);
        expect(SETA_DIREITA.permiteEntrarVindoDe(ALGUMA_DIRECAO.exceto(DIREITA))).toBe(false);
      });
    });

    describe('COLA', function() {
      it('deve permitir entrar', function() {
        expect(COLA.permiteEntrarVindoDe(TODAS_DIRECOES)).toBe(true);
      });

      it('deve bloquear movimento logo apos entrar', function() {
        expect(COLA.permiteSairLogoAposEntrar()).toBe(false);
      });
    });

    describe('ITEM', function() {
      it('deve permitir passagem', function() {
        expect(ITEM.permiteEntrarVindoDe(TODAS_DIRECOES)).toBe(true);
      });
    });

  });

});
