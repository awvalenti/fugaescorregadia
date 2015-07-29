package com.github.awvalenti.fugaescorregadia.nucleo.comum;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Direcao.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.UtilidadesParaCriacaoDeElemento.*;

import java.util.Arrays;

public enum Elemento {
	VAZIO('-', muitosPorMapa(), PERMITE_PASSAGEM_TOTAL),

	PERSONAGEM('_', umPorMapa(), SE_TENTAR_PASSAR_OCORRE_ERRO),

	PARTIDA('p', umPorMapa(), PERMITE_ENTRADA_MAS_NAO_SAIDA),

	CHEGADA('c', umPorMapa(), PERMITE_ENTRADA_MAS_NAO_SAIDA),

	OBSTACULO('o', muitosPorMapa(), BLOQUEIA_TOTALMENTE_PASSAGEM),

	SETA_CIMA('^', muitosPorMapa(), permitePassagemSomentePara(CIMA)),

	SETA_BAIXO('v', muitosPorMapa(), permitePassagemSomentePara(BAIXO)),

	SETA_ESQUERDA('<', muitosPorMapa(), permitePassagemSomentePara(ESQUERDA)),

	SETA_DIREITA('>', muitosPorMapa(), permitePassagemSomentePara(DIREITA)),

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

	public boolean bloqueiaEntrada(Direcao paraOndeVai) {
		return !algoritmoPassagem.permiteEntrada(paraOndeVai);
	}

	public boolean bloqueiaSaidaImediata() {
		return !algoritmoPassagem.permiteSaidaImediata();
	}

	public boolean somenteUmPorMapa() {
		return somenteUmPorMapa;
	}

	public boolean fazPassarDeFase() {
		return equals(CHEGADA);
	}

	private static interface AlgoritmoPassagem {
		boolean permiteEntrada(Direcao paraOndeVai);
		boolean permiteSaidaImediata();
	}

	static class UtilidadesParaCriacaoDeElemento {
		static boolean muitosPorMapa() { return false; }
		static boolean umPorMapa() { return true; }

		static final AlgoritmoPassagem BLOQUEIA_TOTALMENTE_PASSAGEM = new AlgoritmoPassagem() {
			@Override public boolean permiteEntrada(Direcao paraOndeVai) { return false; }
			@Override public boolean permiteSaidaImediata() { return false; }
		};

		static final AlgoritmoPassagem PERMITE_PASSAGEM_TOTAL = new AlgoritmoPassagem() {
			@Override public boolean permiteEntrada(Direcao paraOndeVai) { return true; }
			@Override public boolean permiteSaidaImediata() { return true; }
		};

		static final AlgoritmoPassagem PERMITE_ENTRADA_MAS_NAO_SAIDA = new AlgoritmoPassagem() {
			@Override public boolean permiteEntrada(Direcao paraOndeVai) { return true; }
			@Override public boolean permiteSaidaImediata() { return false; }
		};

		static final AlgoritmoPassagem SE_TENTAR_PASSAR_OCORRE_ERRO = new AlgoritmoPassagem() {
			@Override public boolean permiteEntrada(Direcao paraOndeVai) { throw new IllegalStateException(); }
			@Override public boolean permiteSaidaImediata() { throw new IllegalStateException(); }
		};

		static AlgoritmoPassagem permitePassagemSomentePara(Direcao d) {
			return new AlgoritmoPassagem() {
				@Override public boolean permiteEntrada(Direcao paraOndeVai) { return paraOndeVai.equals(d); }
				@Override public boolean permiteSaidaImediata() { return true; }
			};
		}
	}

}
