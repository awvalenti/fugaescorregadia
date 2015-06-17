package com.github.awvalenti.fugaescorregadia.nucleo.comum;

public interface MapaLeitura {

	int getNumeroColunas();

	int getNumeroLinhas();

	Elemento getElemento(Posicao p);

	IteradorMapa iterador();

}
