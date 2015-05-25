package com.github.awvalenti.fugaescorregadia.nucleo;

public class Tabuleiro extends Mapa {

	public Tabuleiro(Mapa mapa) {
		super(mapa);
	}

	public Posicao getPosicaoPersonagem() {
		// TODO Mover para FuncionalJava8
		return elementos.entrySet().stream()
				.filter(entry -> entry.getValue() == Elemento.PERSONAGEM)
				.findFirst().get().getKey();
	}

}
