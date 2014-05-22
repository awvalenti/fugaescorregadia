define([
  'lib/non-amd/underscore',
  'RepoPosicoes',
  'FabricaEventos',
  'CompiladorMapa',
  'Tabuleiro'
],
function(
  _,
  RepoPosicoes,
  FabricaEventos,
  CompiladorMapa,
  Tabuleiro
) {
  'use strict';

  var movimentoPara = FabricaEventos.movimentoPara;
  var item = FabricaEventos.item;

  describe('Tabuleiro', function() {
    var stringMapa =
      '_ _ _' +
      'i _ _' +
      '_ _ _' +
      '';
    var tabuleiro = null, aPosicao;

    beforeEach(function() {
      aPosicao = _(RepoPosicoes.prototype.obter).bind(new RepoPosicoes());
      tabuleiro = new Tabuleiro(new CompiladorMapa().compilar(stringMapa, 3, 3));
    });

    it('deve alterar seu proprio estado com base nos eventosMovimento', function() {
      tabuleiro.atualizar([movimentoPara(aPosicao(1, 2))]);
      expect(tabuleiro.novoEstado()).toBe('alguma coisa aqui');
    });

  });

});
