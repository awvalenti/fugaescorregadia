package com.github.awvalenti.fugaescorregadia.nucleo.comum;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;

import java.util.Arrays;
import java.util.Optional;

public class MapaLeituraEscrita implements MapaLeitura {

	private final Elemento[][] matriz;
	private SaidaMapaEscrita saida = SaidaMapaEscrita.NULA;

	public MapaLeituraEscrita(Elemento[][] matriz) {
		this.matriz = matriz;
	}

	public MapaLeituraEscrita(MapaLeitura outro) {
		this(new Elemento[outro.getNumeroLinhas()][outro.getNumeroColunas()]);

		for (IteradorMapa it = outro.iterador(); it.temProximo(); it.avancar()) {
			alterarMatriz(it.posicaoAtual(), it.elementoAtual());
		}
	}

	public void setSaida(SaidaMapaEscrita saida) {
		this.saida = saida;
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

	public final void modificar(Posicao p, Elemento novo) {
		if (novo.somenteUmPorMapa()) {
			buscar(novo).ifPresent(ondeEstavaAntes -> alterarMatriz(ondeEstavaAntes, VAZIO));
		}
		alterarMatriz(p, novo);
	}

	public final Optional<Posicao> buscar(Elemento e) {
		for (IteradorMapa it = iterador(); it.temProximo(); it.avancar()) {
			if (it.elementoAtual().equals(e)) return Optional.of(it.posicaoAtual());
		}

		return Optional.empty();
	}

	private void alterarMatriz(Posicao p, Elemento elemento) {
		matriz[p.getLinha()][p.getColuna()] = elemento;
		saida.elementoAlterado(p, elemento);
	}

	public void rotacionar(Direcao d) {
		int incLinha = d.getIncrementoLinha(), incColuna = d.getIncrementoColuna();

		if (d.ehHorizontal()) {
			rotacionarHorizontalmente(incColuna, ((getNumeroColunas() - 1) * (incColuna + 1)) / 2,
					((getNumeroColunas() - 1) * (-incColuna + 1)) / 2);
		} else if (d.ehVertical()) {
			rotacionarVerticalmente(incLinha, ((getNumeroLinhas() - 1) * (incLinha + 1)) / 2,
					((getNumeroLinhas() - 1) * (-incLinha + 1)) / 2);
		}

		saida.mapaCompletamenteAlterado(this);
	}

	private void rotacionarVerticalmente(int incLinha, int linhaPrimeiroElemento, int linhaUltimoElemento) {
		for (int coluna = 0; coluna < getNumeroColunas(); ++coluna) {
			Elemento primeiro = matriz[linhaPrimeiroElemento][coluna];
			for (int linha = linhaPrimeiroElemento; linha != linhaUltimoElemento; linha -= incLinha) {
				matriz[linha][coluna] = matriz[linha - incLinha][coluna];
			}
			matriz[linhaUltimoElemento][coluna] = primeiro;
		}
	}

	private void rotacionarHorizontalmente(int incColuna, int colunaPrimeiroElemento,
			int colunaUltimoElemento) {
		for (int linha = 0; linha < getNumeroLinhas(); ++linha) {
			Elemento primeiro = matriz[linha][colunaPrimeiroElemento];
			for (int coluna = colunaPrimeiroElemento; coluna != colunaUltimoElemento; coluna -= incColuna) {
				matriz[linha][coluna] = matriz[linha][coluna - incColuna];
			}
			matriz[linha][colunaUltimoElemento] = primeiro;
		}
	}

	@Override
	public final boolean posicaoValida(Posicao p) {
		int linha = p.getLinha(), coluna = p.getColuna();
		return linha >= 0 && linha < getNumeroLinhas() && coluna >= 0
				&& coluna < getNumeroColunas();
	}

	@Override
	public IteradorMapa iterador() {
		return new IteradorMapa(this);
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

}