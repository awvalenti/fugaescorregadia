package com.github.awvalenti.fugaescorregadia.nucleo;

import static java.awt.Color.*;

import java.awt.Color;
import java.util.Arrays;

public enum Elemento {
	PERSONAGEM('p', ORANGE, false),

	VAZIO('-', GRAY, false),

	OBSTACULO('o', CYAN, true);

	private final char caractere;
	private final Color cor;
	private final boolean bloqueiaMovimento;

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

	private Elemento(char caractere, Color cor, boolean bloqueiaMovimento) {
		this.caractere = caractere;
		this.cor = cor;
		this.bloqueiaMovimento = bloqueiaMovimento;
	}

	public char getCaractere() {
		return caractere;
	}

	public Color getCor() {
		return cor;
	}

	public boolean bloqueiaMovimento() {
		return bloqueiaMovimento;
	}

}
