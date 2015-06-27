package com.github.awvalenti.fugaescorregadia.nucleo.comum;

public interface SaidaMapa {

	void mapaCompletamenteAlterado(MapaLeitura mapa);

	void elementoAlterado(Posicao p, Elemento novo);

	SaidaMapa NULA = new SaidaMapa() {
		@Override public void elementoAlterado(Posicao p, Elemento novo) {}
		@Override public void mapaCompletamenteAlterado(MapaLeitura mapa) {}
	};

}
