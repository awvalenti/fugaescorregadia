package com.github.awvalenti.fugaescorregadia.nucleo.comum;

import static java.awt.event.KeyEvent.*;

import java.util.Arrays;
import java.util.Optional;

public enum Direcao {
	ESQUERDA(VK_LEFT, 0, -1),

	CIMA(VK_UP, -1, 0),

	DIREITA(VK_RIGHT, 0, 1),

	BAIXO(VK_DOWN, 1, 0),
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

	public boolean ehHorizontal() {
		return incrementoLinha == 0 && incrementoColuna != 0;
	}

	public boolean ehVertical() {
		return incrementoLinha != 0 && incrementoColuna == 0;
	}

}
