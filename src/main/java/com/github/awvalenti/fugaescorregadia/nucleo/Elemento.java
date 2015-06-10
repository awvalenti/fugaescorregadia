package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.nucleo.Direcao.*;
import static java.awt.Color.*;

import java.awt.Color;
import java.util.Arrays;

public enum Elemento {
	PERSONAGEM('p', ORANGE, AlgoritmoPassagem.NAO_DEVE_ACONTECER),

	VAZIO('-', GRAY, AlgoritmoPassagem.PERMITE_SEMPRE),

	OBSTACULO('o', CYAN, AlgoritmoPassagem.BLOQUEIA_SEMPRE),

	SETA_CIMA('^', CYAN, paraOndeVai -> paraOndeVai == CIMA),

	SETA_BAIXO('v', CYAN, paraOndeVai -> paraOndeVai == BAIXO),

	SETA_ESQUERDA('<', CYAN, paraOndeVai -> paraOndeVai == ESQUERDA),

	SETA_DIREITA('>', CYAN, paraOndeVai -> paraOndeVai == DIREITA),

	;

	private final char caractere;
	private final Color cor;
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

	private Elemento(char caractere, Color cor, AlgoritmoPassagem algoritmoPassagem) {
		this.caractere = caractere;
		this.cor = cor;
		this.algoritmoPassagem = algoritmoPassagem;
	}

	public char getCaractere() {
		return caractere;
	}

	public Color getCor() {
		return cor;
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
