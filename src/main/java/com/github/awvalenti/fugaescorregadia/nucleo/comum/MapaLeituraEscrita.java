package com.github.awvalenti.fugaescorregadia.nucleo.comum;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;

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
		int incLinha = d.getIncrementoLinha(), incColuna = d.getIncrementoColuna();

		if (d.ehHorizontal()) {
			int colunaPrimeiroElemento = ((getNumeroColunas() - 1) * (incColuna + 1)) / 2,
					colunaUltimoElemento = ((getNumeroColunas() - 1) * (-incColuna + 1)) / 2;

			for (int linha = 0; linha < getNumeroLinhas(); ++linha) {
				Elemento primeiro = matriz[linha][colunaPrimeiroElemento];
				for (int coluna = colunaPrimeiroElemento; coluna != colunaUltimoElemento; coluna -= incColuna) {
					matriz[linha][coluna] = matriz[linha][coluna - incColuna];
				}
				matriz[linha][colunaUltimoElemento] = primeiro;
			}
		} else if (d.ehVertical()) {
			int linhaPrimeiroElemento = ((getNumeroLinhas() - 1) * (incLinha + 1)) / 2,
					linhaUltimoElemento = ((getNumeroLinhas() - 1) * (-incLinha + 1)) / 2;

			for (int coluna = 0; coluna < getNumeroColunas(); ++coluna) {
				Elemento primeiro = matriz[linhaPrimeiroElemento][coluna];
				for (int linha = linhaPrimeiroElemento; linha != linhaUltimoElemento; linha -= incLinha) {
					matriz[linha][coluna] = matriz[linha - incLinha][coluna];
				}
				matriz[linhaUltimoElemento][coluna] = primeiro;
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

	@Override
	public final boolean posicaoValida(Posicao p) {
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
		return new IteradorMapa(this);
	}

	private static final SaidaMapaEscrita SAIDA_NULA = new SaidaMapaEscrita() {
		@Override
		public void mapaAlterado(Posicao p, Elemento novo) {
		}
	};

}