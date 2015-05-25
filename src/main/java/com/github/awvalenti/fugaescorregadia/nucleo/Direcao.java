package com.github.awvalenti.fugaescorregadia.nucleo;

public enum Direcao {
	ESQUERDA(0, -1), CIMA(-1, 0), DIREITA(0, 1), BAIXO(1, 0);

	private final int incrementoLinha;
	private final int incrementoColuna;

	private Direcao(int incrementoLinha, int incrementoColuna) {
		this.incrementoLinha = incrementoLinha;
		this.incrementoColuna = incrementoColuna;
	}

	public int getIncrementoLinha() {
		return incrementoLinha;
	}

	public int getIncrementoColuna() {
		return incrementoColuna;
	}

}
