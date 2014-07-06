define([
  'prod/aplicacao/model/Elemento',
  'prod/aplicacao/model/Elemento/PERSONAGEM',
  '_'
],
function(
  Elemento,
  PERSONAGEM,
  _
) {
  'use strict';

  function TabuleiroController(model, view) {
    this._model = model;
    this._view = view;
  }

  TabuleiroController.prototype.executarMovimento = function(direcao) {
    var resultadoMovimento = this._model.executarMovimento(direcao);

    resultadoMovimento.paraCadaEvento({
      movimento: function(origem, destino) {
        this._view.reposicionarPersonagem(origem, destino);
      },

      item: function(posicao) {
        this._view.coletarItem(posicao);
      }
    }, this);
  };

  return TabuleiroController;

});
