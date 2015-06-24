package com.github.awvalenti.fugaescorregadia.nucleo.comum;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Direcao.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao.*;

import java.util.Arrays;
import java.util.Optional;

public class MapaLeituraEscrita implements MapaLeitura {

	private Elemento[][] matriz;

	public MapaLeituraEscrita(Elemento[][] matriz) {
		this.matriz = matriz;
	}

	public MapaLeituraEscrita(MapaLeitura outro) {
		this(new Elemento[outro.getNumeroLinhas()][outro.getNumeroColunas()]);

		for (IteradorMapa it = outro.iterador(); it.temProximo(); it.avancar()) {
			alterarMatriz(it.posicaoAtual(), it.elementoAtual(), SAIDA_NULA);
		}
	}

	@Override
	public final int getNumeroLinhas() {
		return matriz.length;
	}

	@Override
	public final int getNumeroColunas() {
		return matriz[0].length;
	}

	@Override
	public final Elemento getElemento(Posicao p) {
		return posicaoValida(p) ? matriz[p.getLinha()][p.getColuna()] : OBSTACULO;
	}

	public void rotacionar(Direcao d) {
		// TODO Simplificar algoritmo ou mover para outra classe
		int incColuna = d.getIncrementoColuna();
		int colunaPrimeiroElemento = ((getNumeroColunas() - 1) * (incColuna + 1)) / 2;
		int colunaUltimoElemento = ((getNumeroColunas() - 1) * (-incColuna + 1)) / 2;
		if (d == ESQUERDA || d == DIREITA) {
			for (int linha = 0; linha < getNumeroLinhas(); ++linha) {
				Elemento primeiro = matriz[linha][colunaPrimeiroElemento];
				for (int coluna = colunaPrimeiroElemento; coluna != colunaUltimoElemento; coluna -= incColuna) {
					matriz[linha][coluna] = matriz[linha][coluna - incColuna];
				}
				matriz[linha][colunaUltimoElemento] = primeiro;
			}
		} else if (d == CIMA) {
			for (int coluna = 0; coluna < getNumeroColunas(); ++coluna) {
				Elemento primeiro = matriz[0][coluna];
				for (int linha = 0; linha < getNumeroLinhas() - 1; ++linha) {
					matriz[linha][coluna] = matriz[linha + 1][coluna];
				}
				matriz[getNumeroLinhas() - 1][coluna] = primeiro;
			}
		} else if (d == BAIXO) {
			for (int coluna = 0; coluna < getNumeroColunas(); ++coluna) {
				Elemento ultimo = matriz[getNumeroLinhas() - 1][coluna];
				for (int linha = getNumeroLinhas() - 1; linha > 0; --linha) {
					matriz[linha][coluna] = matriz[linha - 1][coluna];
				}
				matriz[0][coluna] = ultimo;
			}
		}
	}

	public final void modificarSemProduzirSaida(Posicao p, Elemento novo) {
		modificarProduzindoSaida(p, novo, SAIDA_NULA);
	}

	public final void modificarProduzindoSaida(Posicao p, Elemento novo, SaidaMapaEscrita saida) {
		if (novo.somenteUmPorMapa()) {
			encontrar(novo).ifPresent(
					ondeEstavaAntes -> alterarMatriz(ondeEstavaAntes, VAZIO, saida));
		}
		alterarMatriz(p, novo, saida);
	}

	public final Optional<Posicao> encontrar(Elemento e) {
		for (IteradorMapa it = iterador(); it.temProximo(); it.avancar()) {
			if (it.elementoAtual().equals(e)) return Optional.of(it.posicaoAtual());
		}

		return Optional.empty();
	}

	private void alterarMatriz(Posicao p, Elemento elemento, SaidaMapaEscrita saida) {
		matriz[p.getLinha()][p.getColuna()] = elemento;
		saida.mapaAlterado(p, elemento);
	}

	private boolean posicaoValida(Posicao p) {
		int linha = p.getLinha(), coluna = p.getColuna();
		return linha >= 0 && linha < getNumeroLinhas() && coluna >= 0
				&& coluna < getNumeroColunas();
	}

	@Override
	public boolean equals(Object o) {
		if (!(o instanceof MapaLeituraEscrita)) return false;
		return Arrays.deepEquals(matriz, ((MapaLeituraEscrita) o).matriz);
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

	private static final SaidaMapaEscrita SAIDA_NULA = new SaidaMapaEscrita() {
		@Override
		public void mapaAlterado(Posicao p, Elemento novo) {
		}
	};

}