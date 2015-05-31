package com.github.awvalenti.fugaescorregadia.nucleo;

import java.util.Arrays;

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

	public static Elemento comCaractere(char c) {
		return Arrays
				.stream(Elemento.values())
				.filter(e -> e.getCaractere() == c)
				.findFirst()
				.orElseThrow(
						() -> new IllegalArgumentException(String.format(
								"Caractere invalido. Codigo: %d. Valor: %c.",
								(int) c, c)));
	}

}
