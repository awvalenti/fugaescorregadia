package com.github.awvalenti.fugaescorregadia.nucleo.comum;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public abstract class Mapa {

	protected List<List<Elemento>> matriz;

	protected Mapa(List<List<Elemento>> matriz) {
		this.matriz = matriz;
	}

	protected Mapa(Mapa outro) {
		matriz = outro.matriz.stream().map(linha -> new ArrayList<>(linha))
				.collect(Collectors.toList());
	}

	public final int getNumeroLinhas() {
		return matriz.size();
	}

	public final int getNumeroColunas() {
		return matriz.get(0).size();
	}

	public final Elemento getElemento(Posicao p) {
		return posicaoValida(p) ? matriz.get(p.getLinha()).get(p.getColuna()) : OBSTACULO;
	}

	private boolean posicaoValida(Posicao p) {
		int linha = p.getLinha(), coluna = p.getColuna();
		return linha >= 0 && linha < getNumeroLinhas() && coluna >= 0
				&& coluna < getNumeroColunas();
	}

	@Override
	public boolean equals(Object o) {
		if (!(o instanceof Mapa)) return false;
		return matriz.equals(((Mapa) o).matriz);
	}

	@Override
	public int hashCode() {
		return matriz.hashCode();
	}

	@Override
	public String toString() {
		return matriz.toString();
	}

}