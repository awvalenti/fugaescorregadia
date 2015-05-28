package com.github.awvalenti.fugaescorregadia.nucleo;

public class Tabuleiro extends Mapa {

	public Tabuleiro(Mapa mapa) {
		super(mapa);
	}

	public Posicao getPosicaoPersonagem() {
		return elementos.entrySet().stream()
				.filter(entry -> entry.getValue() == Elemento.PERSONAGEM)
				.findFirst().get().getKey();
	}

	public void setElemento(Posicao p, Elemento novo) {
		elementos.put(p, novo);
	}

}
