define([
  'prod/aplicacao/Elemento/COLA',
  'prod/aplicacao/Elemento/OBSTACULO',
  'prod/aplicacao/Elemento/PERSONAGEM',
  'prod/aplicacao/Elemento/SETA_BAIXO',
  'prod/aplicacao/Elemento/SETA_CIMA',
  'prod/aplicacao/Elemento/SETA_DIREITA',
  'prod/aplicacao/Elemento/SETA_ESQUERDA',
  'prod/aplicacao/Elemento/VAZIO',
  'prod/aplicacao/Elemento/ITEM',
  'prod/aplicacao/CompiladorMapa',
],
function(
  COLA,
  OBSTACULO,
  PERSONAGEM,
  SETA_BAIXO,
  SETA_CIMA,
  SETA_DIREITA,
  SETA_ESQUERDA,
  VAZIO,
  ITEM,
  CompiladorMapa
) {
  'use strict';

  describe('CompiladorMapa', function() {
    var compilador = null;

    beforeEach(function() {
      compilador = new CompiladorMapa();
    });

    it('deve converter stringMapa em matriz de elementos', function() {
      var stringMapa = '\
        _ v _ _ \
        p _ o o \
      ';

      expect(compilador.compilar(2, 4, stringMapa)).toEqual([
        [VAZIO,        SETA_BAIXO,   VAZIO,       VAZIO    ],
        [PERSONAGEM,   VAZIO,        OBSTACULO,   OBSTACULO]
      ]);
    });

    it('deve rejeitar stringMapa com caracteres nao reconhecidos', function() {
      expect(function() { compilador.compilar(1, 3, '_ _ k'); }).toThrow('Caractere nao reconhecido: k');
    });

    it('deve rejeitar stringMapa com tamanho diferente do esperado', function() {
      expect(function() { compilador.compilar(1, 2, '_ _ _'); }).toThrow('Esperado: 2 elemento(s). Encontrado: 3 elemento(s).');
      expect(function() { compilador.compilar(1, 5, '_ _ _'); }).toThrow('Esperado: 5 elemento(s). Encontrado: 3 elemento(s).');
    });

  });

});
