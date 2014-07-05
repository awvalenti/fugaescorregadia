define([
  'prod/aplicacao/model/TabuleiroModel',
  'prod/aplicacao/model/Mapa',
  'prod/aplicacao/model/RepoPosicoes',
  'prod/aplicacao/model/Elemento/ITEM',
  'prod/aplicacao/model/Elemento/VAZIO',
  'prod/aplicacao/model/Elemento/PERSONAGEM'
],
function(
  TabuleiroModel,
  Mapa,
  RepoPosicoes,
  ITEM,
  VAZIO,
  PERSONAGEM
) {
  'use strict';

  describe('TabuleiroModel', function() {
    var tabuleiroModel = null, repoPosicoes = null;

    beforeEach(function() {
      repoPosicoes = new RepoPosicoes();

      tabuleiroModel = new TabuleiroModel(repoPosicoes, new Mapa(2, 3,
        '_ p _' +
        '_ _ _' +
        ''
      ));
    });

    it('deve permitir percorrer todos os elementos', function() {
      var resultado = '';

      tabuleiroModel.paraCada({
        inicioLinha: function()         { resultado += 'inicioLinha '; },
        elemento:    function(elemento) { resultado += elemento + ' '; },
        fimLinha:    function()         { resultado += 'fimLinha ';    }
      });

      expect(resultado).toBe(
        'inicioLinha VAZIO PERSONAGEM VAZIO fimLinha ' +
        'inicioLinha VAZIO VAZIO VAZIO fimLinha '
      );
    });

    it('deve permitir obter elementos por meio da posicao', function() {
      expect(tabuleiroModel.elementoEm(repoPosicoes.obter(0, 0))).toBe(VAZIO);
      expect(tabuleiroModel.elementoEm(repoPosicoes.obter(0, 1))).toBe(PERSONAGEM);
    });

    it('deve permitir obter a posicao do personagem', function() {
      expect(tabuleiroModel.posicaoPersonagem()).toBe(repoPosicoes.obter(0, 1));
    });

  });

});
