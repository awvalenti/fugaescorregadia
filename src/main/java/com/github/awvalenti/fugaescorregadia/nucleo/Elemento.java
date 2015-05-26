package com.github.awvalenti.fugaescorregadia.nucleo;

public enum Elemento {
	PERSONAGEM('p', false),

	VAZIO('_', false),

	OBSTACULO('o', true);

	private final char caractere;
	private final boolean bloqueiaMovimento;

	private Elemento(char caractere, boolean bloqueiaMovimento) {
		this.caractere = caractere;
		this.bloqueiaMovimento = bloqueiaMovimento;
	}

	public char getCaractere() {
		return caractere;
	}

	public boolean bloqueiaMovimento() {
		return bloqueiaMovimento;
	}

}
