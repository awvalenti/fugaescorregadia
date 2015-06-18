package com.github.awvalenti.fugaescorregadia.nucleo.comum;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Direcao.*;

import java.util.Arrays;

public enum Elemento {
	VAZIO('-', false, AlgoritmoPassagem.PERMITE_SEMPRE),

	PERSONAGEM('p', true, AlgoritmoPassagem.NAO_DEVE_ACONTECER),

	OBSTACULO('o', false, AlgoritmoPassagem.BLOQUEIA_SEMPRE),

	SETA_CIMA('^', false, paraOndeVai -> paraOndeVai == CIMA),

	SETA_BAIXO('v', false, paraOndeVai -> paraOndeVai == BAIXO),

	SETA_ESQUERDA('<', false, paraOndeVai -> paraOndeVai == ESQUERDA),

	SETA_DIREITA('>', false, paraOndeVai -> paraOndeVai == DIREITA),

	;

	private final char caractere;
	private final boolean somenteUmPorMapa;
	private final AlgoritmoPassagem algoritmoPassagem;

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

	private Elemento(char caractere, boolean somenteUmPorMapa, AlgoritmoPassagem algoritmoPassagem) {
		this.caractere = caractere;
		this.somenteUmPorMapa = somenteUmPorMapa;
		this.algoritmoPassagem = algoritmoPassagem;
	}

	public char getCaractere() {
		return caractere;
	}

	public boolean permitePassagem(Direcao paraOndeVai) {
		return algoritmoPassagem.permitePasagem(paraOndeVai);
	}

	public boolean somenteUmPorMapa() {
		return somenteUmPorMapa;
	}

}

interface AlgoritmoPassagem {
	boolean permitePasagem(Direcao paraOndeVai);

	static final AlgoritmoPassagem BLOQUEIA_SEMPRE = paraOndeVai -> false;
	static final AlgoritmoPassagem PERMITE_SEMPRE = paraOndeVai -> true;
	static final AlgoritmoPassagem NAO_DEVE_ACONTECER = paraOndeVai -> { throw new IllegalStateException(); };
}
