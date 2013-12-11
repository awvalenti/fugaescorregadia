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
      expect(compilador.compilar('_ _ o', 1, 3)).toEqual([[VAZIO, VAZIO, OBSTACULO]]);

      var mapa3Linhas4Colunas = '\
        _ _ _ _ \
        _ _ o o \
        _ v _ _ \
      ';

      expect(compilador.compilar(mapa3Linhas4Colunas, 3, 4)).toEqual([
        [VAZIO,   VAZIO,      VAZIO,     VAZIO    ],
        [VAZIO,   VAZIO,      OBSTACULO, OBSTACULO],
        [VAZIO,   SETA_BAIXO, VAZIO,     VAZIO    ]
      ]);
    });

    it('deve rejeitar stringMapa com caracteres nao reconhecidos', function() {
      expect(function() { compilador.compilar('_ _ k', 1, 3); }).toThrow('Caractere nao reconhecido: k');
    });

    it('deve rejeitar stringMapa com tamanho menor que o esperado', function() {
      expect(function() { compilador.compilar('_ _ _', 1, 10); }).toThrow('Tamanho informado: 1x10. Tamanho encontrado: 1x3.');
    });

    it('deve rejeitar stringMapa com tamanho maior que o esperado', function() {
      expect(function() { compilador.compilar('_ _ _ _', 1, 3); }).toThrow('Tamanho informado: 1x3. Tamanho encontrado: 2x3.');
    });

  });

});
