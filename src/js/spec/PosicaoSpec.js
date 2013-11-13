define([
  'Posicao'
],
function(
  Posicao
) {

  describe('Posicao', function() {
    it('deve reaproveitar instancias de objetos', function() {
      expect(Posicao(5, 5)).toBe(Posicao(5, 5));
    });

    it('deve proibir argumentos nao-inteiros', function() {
      expect(function() { Posicao('hasOwnProperty', 5); }).toThrow();
      expect(function() { Posicao(5, 'constructor');    }).toThrow();
    });

  });

});
