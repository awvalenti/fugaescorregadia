define([
  'prod/aplicacao/model/RepoPosicoes',
  'prod/aplicacao/model/Direcao/BAIXO',
  'prod/aplicacao/model/Direcao/CIMA',
  'prod/aplicacao/model/Direcao/DIREITA',
  'prod/aplicacao/model/Direcao/ESQUERDA',
],
function(
  RepoPosicoes,
  BAIXO,
  CIMA,
  DIREITA,
  ESQUERDA
) {
  'use strict';

  describe('RepoPosicoes', function() {
    var repoPosicoes = null;

    beforeEach(function() {
      repoPosicoes = new RepoPosicoes();
    });

    it('iguais devem reaproveitar instancias de Posicao', function() {
      expect(repoPosicoes.obter(3, 4)).toBe(repoPosicoes.obter(3, 4));
    });

    it('diferentes devem criar instancias diferentes de Posicao', function() {
      expect(repoPosicoes.obter(5, 6)).not.toBe(new RepoPosicoes().obter(5, 6));
    });

    it('deve rejeitar argumentos nao-numericos', function() {
      expect(function() { repoPosicoes.obter('hasOwnProperty', 5); }).toThrow();
      expect(function() { repoPosicoes.obter(5, 'constructor');    }).toThrow();
    });

  });

});