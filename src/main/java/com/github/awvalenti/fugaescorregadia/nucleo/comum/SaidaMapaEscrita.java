package com.github.awvalenti.fugaescorregadia.nucleo.comum;

public interface SaidaMapaEscrita {

	void mapaCompletamenteAlterado(MapaLeitura mapa);

	void elementoAlterado(Posicao p, Elemento novo);

	SaidaMapaEscrita NULA = new SaidaMapaEscrita() {
		@Override public void elementoAlterado(Posicao p, Elemento novo) {}
		@Override public void mapaCompletamenteAlterado(MapaLeitura mapa) {}
	};

}
