define([
  'prod/aplicacao/model/TabuleiroModel',
  'prod/aplicacao/model/Mapa',
  'prod/aplicacao/model/RepoPosicoes',
  'prod/aplicacao/model/Direcao/DIREITA',
  'prod/aplicacao/model/Elemento/ITEM',
  'prod/aplicacao/model/Elemento/VAZIO',
  'prod/aplicacao/model/Elemento/PERSONAGEM',
  '_'
],
function(
  TabuleiroModel,
  Mapa,
  RepoPosicoes,
  DIREITA,
  ITEM,
  VAZIO,
  PERSONAGEM,
  _
) {
  'use strict';

  describe('TabuleiroModel', function() {
    var aPosicao = null, tabuleiroModel = null, mov = null;

    beforeEach(function() {
      var repoPosicoes = new RepoPosicoes();
      aPosicao = _(RepoPosicoes.prototype.obter).bind(repoPosicoes);
      mov = jasmine.createSpyObj('movimentacao', ['calcularMovimento']);
      tabuleiroModel = new TabuleiroModel(repoPosicoes, new Mapa(2, 3,
        '_ p _' +
        '_ _ _' +
        ''
      ), mov);
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

    it('deve delegar movimentacao', function() {
      tabuleiroModel.executarMovimento(DIREITA);
      expect(mov.calcularMovimento).toHaveBeenCalledWith(aPosicao(0, 1), DIREITA, tabuleiroModel);
    });

  });

});
