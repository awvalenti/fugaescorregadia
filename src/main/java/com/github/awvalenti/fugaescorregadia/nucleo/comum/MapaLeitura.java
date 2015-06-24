package com.github.awvalenti.fugaescorregadia.nucleo.comum;

public interface MapaLeitura {

	int getNumeroColunas();

	int getNumeroLinhas();

	boolean posicaoValida(Posicao p);

	Elemento getElemento(Posicao p);

	IteradorMapa iterador();

}
