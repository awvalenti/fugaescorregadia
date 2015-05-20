package com.github.awvalenti.fugaescorregadia;

public enum Elemento {
	PERSONAGEM('p'), VAZIO('_'), OBSTACULO('o');

	private final char caractere;

	private Elemento(char caractere) {
		this.caractere = caractere;
	}

	public char getCaractere() {
		return caractere;
	}

}
