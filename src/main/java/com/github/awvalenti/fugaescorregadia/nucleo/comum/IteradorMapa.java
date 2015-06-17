package com.github.awvalenti.fugaescorregadia.nucleo.comum;

public interface IteradorMapa {

	boolean iniciouNovaLinha();

	boolean temProximo();

	void avancar();

	Elemento elementoAtual();

	Posicao posicaoAtual();

}
