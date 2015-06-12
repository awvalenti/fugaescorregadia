package com.github.awvalenti.fugaescorregadia.nucleo.comum;

import java.awt.event.KeyEvent;
import java.util.Arrays;
import java.util.Optional;

public enum Direcao {
	ESQUERDA(KeyEvent.VK_LEFT, 0, -1),

	CIMA(KeyEvent.VK_UP, -1, 0),

	DIREITA(KeyEvent.VK_RIGHT, 0, 1),

	BAIXO(KeyEvent.VK_DOWN, 1, 0),
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
