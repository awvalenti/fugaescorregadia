package com.github.awvalenti.fugaescorregadia.nucleo;

public interface SaidaJogo {

	void inicioTentativa(Mapa mapa);

	void movimento(Posicao origem, Elemento elementoNaOrigem, Posicao destino);

}
