define([
  'prod/aplicacao/Direcao',
  'prod/aplicacao/Direcao/BAIXO',
  'prod/aplicacao/Direcao/CIMA',
  'prod/aplicacao/Direcao/DIREITA',
  'prod/aplicacao/Direcao/ESQUERDA',
  'spec/unidade/spec-helper/DirecaoMatcher/ALGUMA_DIRECAO',
  'spec/unidade/spec-helper/DirecaoMatcher/TODAS_DIRECOES',
],
function(
  Direcao,
  BAIXO,
  CIMA,
  DIREITA,
  ESQUERDA,
  ALGUMA_DIRECAO,
  TODAS_DIRECOES
) {
  'use strict';

  describe('DirecaoMatcher', function() {
    describe('TODAS_DIRECOES', function() {
      it('nao deve corresponder a nenhuma direcao isolada', function() {
        expect(TODAS_DIRECOES.matches(BAIXO)).toBe(false);
        expect(TODAS_DIRECOES.matches(CIMA)).toBe(false);
        expect(TODAS_DIRECOES.matches(DIREITA)).toBe(false);
        expect(TODAS_DIRECOES.matches(ESQUERDA)).toBe(false);
      });
    });

    describe('ALGUMA_DIRECAO', function() {
      it('deve corresponder a cada uma das direcoes', function() {
        expect(ALGUMA_DIRECAO.matches(BAIXO)).toBe(true);
        expect(ALGUMA_DIRECAO.matches(CIMA)).toBe(true);
        expect(ALGUMA_DIRECAO.matches(DIREITA)).toBe(true);
        expect(ALGUMA_DIRECAO.matches(ESQUERDA)).toBe(true);
      });

      describe('metodo exceto deve produzir matcher que', function() {
        it('nao deve corresponder a direcao especificada', function() {
          expect(ALGUMA_DIRECAO.exceto(CIMA).matches(CIMA)).toBe(false);
        });

        it('deve corresponder a todas as outras', function() {
          expect(ALGUMA_DIRECAO.exceto(CIMA).matches(BAIXO)).toBe(true);
          expect(ALGUMA_DIRECAO.exceto(CIMA).matches(DIREITA)).toBe(true);
          expect(ALGUMA_DIRECAO.exceto(CIMA).matches(ESQUERDA)).toBe(true);
        });
      });
    });
  });
});
