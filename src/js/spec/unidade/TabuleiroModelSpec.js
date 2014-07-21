define([
  'prod/aplicacao/model/TabuleiroModel',
  'prod/aplicacao/model/Movimentacao',
  'prod/aplicacao/model/Mapa',
  'prod/aplicacao/model/RepoPosicoes',
  'prod/aplicacao/model/FabricaEventos',
  'prod/aplicacao/model/ResultadoMovimento',
  'prod/aplicacao/model/Direcao/CIMA',
  'prod/aplicacao/model/Direcao/BAIXO',
  'prod/aplicacao/model/Direcao/ESQUERDA',
  'prod/aplicacao/model/Direcao/DIREITA',
  'prod/aplicacao/model/Elemento/ITEM',
  'prod/aplicacao/model/Elemento/VAZIO',
  'prod/aplicacao/model/Elemento/PERSONAGEM',
  '_'
],
function(
  TabuleiroModel,
  Movimentacao,
  Mapa,
  RepoPosicoes,
  FabricaEventos,
  ResultadoMovimento,
  CIMA,
  BAIXO,
  ESQUERDA,
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
      mov = new Movimentacao(2, 3);
      spyOn(mov, 'calcularMovimento').andCallThrough();
      tabuleiroModel = new TabuleiroModel(repoPosicoes, new Mapa(2, 3,
        'p i _' +
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
        'inicioLinha PERSONAGEM ITEM VAZIO fimLinha ' +
        'inicioLinha VAZIO VAZIO VAZIO fimLinha '
      );
    });

    it('deve permitir obter elemento em determinada posicao', function() {
      expect(tabuleiroModel.elementoEm(aPosicao(0, 0))).toBe(PERSONAGEM);
      expect(tabuleiroModel.elementoEm(aPosicao(0, 1))).toBe(ITEM);
      expect(tabuleiroModel.elementoEm(aPosicao(0, 2))).toBe(VAZIO);
    });

    describe('ao executar um movimento', function() {
      beforeEach(function() {
        tabuleiroModel.executarMovimento(DIREITA);
      });

      it('deve delegar movimentacao', function() {
        expect(mov.calcularMovimento).toHaveBeenCalledWith(aPosicao(0, 0), DIREITA, tabuleiroModel);
      });

      it('deve se modificar conforme o resultado do movimento', function() {
        expect(tabuleiroModel.elementoEm(aPosicao(0, 0))).toBe(VAZIO);
        expect(tabuleiroModel.elementoEm(aPosicao(0, 1))).toBe(VAZIO);
        expect(tabuleiroModel.elementoEm(aPosicao(0, 2))).toBe(PERSONAGEM);

        // De acordo com os requisitos, a expectativa abaixo e' mentirosa.
        // Porem, TabuleiroModel esta' fazendo isso acontecer por coincidencia. O certo
        // seria esta expectativa nao passar por enquanto, exigindo alteracoes na implementacao.
        // TabuleiroModel deveria trabalhar com ResultadoMovimento de maneira diferente de como
        // TabuleiroView trabalha. TabuleiroView trabalha de maneira bem sequencial, processando
        // os eventos um a um. TabuleiroModel deveria olhar de maneira mais global para o
        // movimento, perguntando, por exemplo, quais sao os pontos de partida e de chegada
        // e reposicionando o personagem uma vez so'.
        expect(tabuleiroModel.elementoEm(aPosicao(0, 1))).not.toBe(VAZIO);
      });
    });
  });

});
