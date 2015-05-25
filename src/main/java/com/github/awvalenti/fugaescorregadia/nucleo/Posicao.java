package com.github.awvalenti.fugaescorregadia.nucleo;

public class Posicao {

	private final int linha;
	private final int coluna;

	public static Posicao aPosicao(int linha, int coluna) {
		return new Posicao(linha, coluna);
	}

	private Posicao(int linha, int coluna) {
		this.linha = linha;
		this.coluna = coluna;
	}

	public int getLinha() {
		return linha;
	}

	public int getColuna() {
		return coluna;
	}

	public Posicao somar(Direcao d) {
		return aPosicao(linha + d.getIncrementoLinha(), coluna + d.getIncrementoColuna());
	}

	@Override
	public String toString() {
		return String.format("P(%d, %d)", linha, coluna);
	}

	@Override
	public boolean equals(Object outro) {
		if (!(outro instanceof Posicao)) return false;
		Posicao outra = (Posicao) outro;
		return linha == outra.linha && coluna == outra.coluna;
	}

	@Override
	public int hashCode() {
		return linha * 32 + coluna;
	}

}
