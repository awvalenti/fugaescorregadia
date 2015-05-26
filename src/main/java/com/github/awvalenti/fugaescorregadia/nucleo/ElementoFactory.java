package com.github.awvalenti.fugaescorregadia.nucleo;

import java.util.Arrays;

public class ElementoFactory {

	public Elemento comCaractere(char c) {
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
