package com.github.awvalenti.fugaescorregadia;

public class Mapa {

	private Elemento[][] matriz;

	public Mapa(Elemento[][] matriz) {
		this.matriz = matriz;
	}

	// FIXME Encapsular melhor, mas de maneira pratica de usar.
	// Tentei class Mapa implements Iterable<Iterable<Elemento>>
	// e nao ficou bom. Talvez devolver uma List<List<Elemento>>?
	public Elemento[][] getMatriz() {
		return matriz;
	}

}
