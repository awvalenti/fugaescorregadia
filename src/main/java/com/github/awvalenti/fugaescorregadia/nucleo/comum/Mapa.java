package com.github.awvalenti.fugaescorregadia.nucleo.comum;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao.*;

import java.util.Arrays;

public class Mapa implements MapaLeituraEscrita {

	private Elemento[][] matriz;

	public Mapa(Elemento[][] matriz) {
		this.matriz = matriz;
	}

	public Mapa(MapaLeitura outro) {
		this(new Elemento[outro.getNumeroLinhas()][outro.getNumeroColunas()]);

		for (IteradorMapa it = outro.iterador(); it.temProximo(); it.avancar()) {
			setElemento(it.posicaoAtual(), it.elementoAtual());
		}
	}

	@Override
	public int getNumeroLinhas() {
		return matriz.length;
	}

	@Override
	public int getNumeroColunas() {
		return matriz[0].length;
	}

	@Override
	public Elemento getElemento(Posicao p) {
		return posicaoValida(p) ? matriz[p.getLinha()][p.getColuna()] : OBSTACULO;
	}

	@Override
	public void setElemento(Posicao p, Elemento novo) {
		matriz[p.getLinha()][p.getColuna()] = novo;
	}

	private boolean posicaoValida(Posicao p) {
		int linha = p.getLinha(), coluna = p.getColuna();
		return linha >= 0 && linha < getNumeroLinhas() && coluna >= 0
				&& coluna < getNumeroColunas();
	}

	@Override
	public boolean equals(Object o) {
		if (!(o instanceof Mapa)) return false;
		return Arrays.deepEquals(matriz, ((Mapa) o).matriz);
	}

	@Override
	public int hashCode() {
		return matriz.hashCode();
	}

	@Override
	public String toString() {
		return Arrays.deepToString(matriz);
	}

	@Override
	public IteradorMapa iterador() {
		return new IteradorMapa() {
			private Posicao posicaoAtual = aPosicao(0, 0);

			@Override
			public boolean iniciouNovaLinha() {
				return posicaoAtual.getColuna() == 0 && posicaoAtual.getLinha() > 0;
			}

			@Override
			public boolean temProximo() {
				return posicaoValida(posicaoAtual);
			}

			@Override
			public Posicao posicaoAtual() {
				return posicaoAtual;
			}

			@Override
			public Elemento elementoAtual() {
				return getElemento(posicaoAtual);
			}

			@Override
			public void avancar() {
				int novaLinha = posicaoAtual.getLinha();
				int novaColuna = posicaoAtual.getColuna();

				if (++novaColuna >= getNumeroColunas()) {
					novaColuna = 0;
					++novaLinha;
				}

				posicaoAtual = aPosicao(novaLinha, novaColuna);
			}

		};
	}

}