package com.github.awvalenti.fugaescorregadia.nucleo.comum;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.AlgoritmoPassagem.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Direcao.*;

import java.util.Arrays;

public enum Elemento {
	VAZIO('-', muitosPorMapa(), PERMITE_PASSAGEM),

	PERSONAGEM(' ', umPorMapa(), SE_TENTAR_PASSAR_OCORRE_ERRO),

	PARTIDA('p', umPorMapa(), PERMITE_PASSAGEM),

	CHEGADA('*', umPorMapa(), PERMITE_PASSAGEM),

	OBSTACULO('o', muitosPorMapa(), BLOQUEIA_PASSAGEM),

	SETA_CIMA('^', muitosPorMapa(), passagemSomenteIndoPara(CIMA)),

	SETA_BAIXO('v', muitosPorMapa(), passagemSomenteIndoPara(BAIXO)),

	SETA_ESQUERDA('<', muitosPorMapa(), passagemSomenteIndoPara(ESQUERDA)),

	SETA_DIREITA('>', muitosPorMapa(), passagemSomenteIndoPara(DIREITA)),

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
								"Caractere invalido. Codigo: %d. Valor: %c.", (int) c, c)));
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

	public boolean fazPassarDeFase() {
		return equals(CHEGADA);
	}

}

interface AlgoritmoPassagem {
	boolean permitePasagem(Direcao paraOndeVai);

	static final AlgoritmoPassagem BLOQUEIA_PASSAGEM = paraOndeVai -> false;
	static final AlgoritmoPassagem PERMITE_PASSAGEM = paraOndeVai -> true;
	static final AlgoritmoPassagem SE_TENTAR_PASSAR_OCORRE_ERRO = paraOndeVai -> {
		throw new IllegalStateException();
	};

	static AlgoritmoPassagem passagemSomenteIndoPara(Direcao d) {
		return paraOndeVai -> paraOndeVai.equals(d);
	}

	static boolean muitosPorMapa() { return false; }
	static boolean umPorMapa() { return true; }
}
