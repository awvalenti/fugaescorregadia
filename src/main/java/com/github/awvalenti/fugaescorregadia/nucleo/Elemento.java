package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.nucleo.Direcao.*;
import static java.awt.Color.*;

import java.awt.Color;
import java.util.Arrays;

public enum Elemento {
	PERSONAGEM('p', '\u263A', ORANGE, AlgoritmoPassagem.NAO_DEVE_ACONTECER),

	VAZIO('-', ' ', GRAY, AlgoritmoPassagem.PERMITE_SEMPRE),

	OBSTACULO('o', '\u25D8', CYAN, AlgoritmoPassagem.BLOQUEIA_SEMPRE),

	SETA_CIMA('^', '\u25B2', CYAN, paraOndeVai -> paraOndeVai == CIMA),

	SETA_BAIXO('v', '\u25BC', CYAN, paraOndeVai -> paraOndeVai == BAIXO),

	SETA_ESQUERDA('<', '\u25C0', CYAN, paraOndeVai -> paraOndeVai == ESQUERDA),

	SETA_DIREITA('>', '\u25B6', CYAN, paraOndeVai -> paraOndeVai == DIREITA),

	;

	private final char caractereDoMapaEmString;
	private final char caractereParaExibicaoNaTela;
	private final Color cor;
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

	private Elemento(char caractereDoMapaEmString,
			char caractereParaExibicaoNaTela, Color cor,
			AlgoritmoPassagem algoritmoPassagem) {
		this.caractereDoMapaEmString = caractereDoMapaEmString;
		this.caractereParaExibicaoNaTela = caractereParaExibicaoNaTela;
		this.cor = cor;
		this.algoritmoPassagem = algoritmoPassagem;
	}

	public char getCaractereDoMapaEmString() {
		return caractereDoMapaEmString;
	}

	public char getCaractereParaExibicaoNaTela() {
		return caractereParaExibicaoNaTela;
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
