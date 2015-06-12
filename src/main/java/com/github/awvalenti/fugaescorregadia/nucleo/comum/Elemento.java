package com.github.awvalenti.fugaescorregadia.nucleo.comum;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Direcao.*;

import java.util.Arrays;

public enum Elemento {
	PERSONAGEM('p', AlgoritmoPassagem.NAO_DEVE_ACONTECER),

	VAZIO('-', AlgoritmoPassagem.PERMITE_SEMPRE),

	OBSTACULO('o', AlgoritmoPassagem.BLOQUEIA_SEMPRE),

	SETA_CIMA('^', paraOndeVai -> paraOndeVai == CIMA),

	SETA_BAIXO('v', paraOndeVai -> paraOndeVai == BAIXO),

	SETA_ESQUERDA('<', paraOndeVai -> paraOndeVai == ESQUERDA),

	SETA_DIREITA('>', paraOndeVai -> paraOndeVai == DIREITA),

	;

	private final char caractereDoMapaEmString;
	private final AlgoritmoPassagem algoritmoPassagem;

	public static Elemento comCaractere(char c) {
		return Arrays
				.stream(Elemento.values())
				.filter(e -> e.getCaractereDoMapaEmString() == c)
				.findFirst()
				.orElseThrow(
						() -> new IllegalArgumentException(String.format(
								"Caractere invalido. Codigo: %d. Valor: %c.",
								(int) c, c)));
	}

	private Elemento(char caractereDoMapaEmString, AlgoritmoPassagem algoritmoPassagem) {
		this.caractereDoMapaEmString = caractereDoMapaEmString;
		this.algoritmoPassagem = algoritmoPassagem;
	}

	public char getCaractereDoMapaEmString() {
		return caractereDoMapaEmString;
	}

	public boolean permitePassagem(Direcao paraOndeVai) {
		return algoritmoPassagem.permitePasagem(paraOndeVai);
	}

}

interface AlgoritmoPassagem {
	boolean permitePasagem(Direcao paraOndeVai);

	static final AlgoritmoPassagem BLOQUEIA_SEMPRE = paraOndeVai -> false;
	static final AlgoritmoPassagem PERMITE_SEMPRE = paraOndeVai -> true;
	static final AlgoritmoPassagem NAO_DEVE_ACONTECER = paraOndeVai -> { throw new IllegalStateException(); };
}
