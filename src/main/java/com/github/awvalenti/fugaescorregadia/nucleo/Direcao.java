package com.github.awvalenti.fugaescorregadia.nucleo;

import java.util.Arrays;
import java.util.Optional;

public enum Direcao {
	ESQUERDA(37, 0, -1),

	CIMA(38, -1, 0),

	DIREITA(39, 0, 1),

	BAIXO(40, 1, 0),
	;

	private final int codigoTecla;
	private final int incrementoLinha;
	private final int incrementoColuna;

	private Direcao(int codigoTecla, int incrementoLinha, int incrementoColuna) {
		this.codigoTecla = codigoTecla;
		this.incrementoLinha = incrementoLinha;
		this.incrementoColuna = incrementoColuna;
	}

	public int getIncrementoLinha() {
		return incrementoLinha;
	}

	public int getIncrementoColuna() {
		return incrementoColuna;
	}

	public static Optional<Direcao> doCodigoTecla(int codigoTecla) {
		return Arrays.stream(values()).filter(d -> d.codigoTecla == codigoTecla).findFirst();
	}

}
