define([
  'Elemento/COLA',
  'Elemento/OBSTACULO',
  'Elemento/SETA_BAIXO',
  'Elemento/SETA_CIMA',
  'Elemento/SETA_DIREITA',
  'Elemento/SETA_ESQUERDA',
  'Elemento/VAZIO',
  'Elemento/ITEM',
  'CompiladorMapa',
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
        _ _ o o \
      ';

      expect(compilador.compilar(stringMapa, 2, 4)).toEqual([
        [VAZIO,   SETA_BAIXO,   VAZIO,       VAZIO    ],
        [VAZIO,   VAZIO,        OBSTACULO,   OBSTACULO]
      ]);
    });

    it('deve rejeitar stringMapa com caracteres nao reconhecidos', function() {
      expect(function() { compilador.compilar('_ _ k', 1, 3); }).toThrow('Caractere nao reconhecido: k');
    });

    it('deve rejeitar stringMapa com tamanho diferente do esperado', function() {
      expect(function() { compilador.compilar('_ _ _', 1, 2); }).toThrow('Esperado: 2 elemento(s). Encontrado: 3 elemento(s).');
      expect(function() { compilador.compilar('_ _ _', 1, 5); }).toThrow('Esperado: 5 elemento(s). Encontrado: 3 elemento(s).');
    });

  });

});
