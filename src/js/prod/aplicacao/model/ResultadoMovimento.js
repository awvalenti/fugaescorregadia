define([
  '_',
  'prod/aplicacao/model/FabricaEventos'
],
function(
  _,
  FabricaEventos
) {
  'use strict';

  function ResultadoMovimento(posicaoInicial, eventosMovimento) {
    this._posicaoInicial = posicaoInicial;
    this._eventosMovimento = eventosMovimento;
  }

  ResultadoMovimento.prototype.estenderMovimentoPara = function(posicaoAtual) {
    var ultimoElemento = _(this._eventosMovimento).last();
    if (ultimoElemento && ultimoElemento.ehMovimento) {
      ultimoElemento.setPosicaoDestino(posicaoAtual);
    } else {
      this._eventosMovimento.push(FabricaEventos.movimentoPara(posicaoAtual));
    }
  };

  ResultadoMovimento.prototype.coletarItem = function() {
    this._eventosMovimento.push(FabricaEventos.item());
  };

  ResultadoMovimento.prototype.paraCadaEvento = function(funcoes, contexto) {
    var posicaoAtual = this._posicaoInicial;

    _(this._eventosMovimento).each(function(eventoMovimento) {
      posicaoAtual = eventoMovimento.tratarEDevolverNovaPosicao(funcoes, contexto, posicaoAtual);
    });
  };

  ResultadoMovimento.prototype.toString = function() {
    return this._posicaoInicial + ':[' + this._eventosMovimento.join(', ') + ']';
  };

  return ResultadoMovimento;

});
