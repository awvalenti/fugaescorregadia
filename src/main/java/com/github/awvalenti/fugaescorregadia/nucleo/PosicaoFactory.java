package com.github.awvalenti.fugaescorregadia.nucleo;

import java.util.HashMap;
import java.util.Map;

public class PosicaoFactory {

	private Map<Integer, Map<Integer, Posicao>> mapa1 = new HashMap<>();

	public Posicao obter(int linha, int coluna) {
		Map<Integer, Posicao> mapa2 = mapa1.get(linha);
		if (mapa2 == null) mapa1.put(linha, mapa2 = new HashMap<>());

		Posicao p = mapa2.get(coluna);
		if (p == null) mapa2.put(coluna, p = new PosicaoEmCache(linha, coluna));

		return p;
	}

	private static class PosicaoEmCache implements Posicao {
		private final int linha;
		private final int coluna;

		public PosicaoEmCache(int linha, int coluna) {
			this.linha = linha;
			this.coluna = coluna;
		}

		@Override
		public int getLinha() {
			return linha;
		}

		@Override
		public int getColuna() {
			return coluna;
		}

		@Override
		public String toString() {
			return String.format("(%d, %d)", linha, coluna);
		}

		@Override
		public boolean equals(Object outro) {
			if (!(outro instanceof PosicaoEmCache)) return false;
			PosicaoEmCache outra = (PosicaoEmCache) outro;
			return linha == outra.linha && coluna == outra.coluna;
		}

		@Override
		public int hashCode() {
			return 100 * linha + coluna;
		}

	}

}
