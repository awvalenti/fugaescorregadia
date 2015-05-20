package com.github.awvalenti.fugaescorregadia.nucleo;

public class Posicao {

	private final int linha;
	private final int coluna;

	public Posicao(int linha, int coluna) {
		this.linha = linha;
		this.coluna = coluna;
	}

	@Override
	public String toString() {
		return String.format("(%d, %d)", linha, coluna);
	}

	@Override
	public boolean equals(Object outro) {
		if (!(outro instanceof Posicao)) return false;
		Posicao outra = (Posicao) outro;
		return linha == outra.linha && coluna == outra.coluna;
	}

	@Override
	public int hashCode() {
		return 100 * linha + coluna;
	}

}
