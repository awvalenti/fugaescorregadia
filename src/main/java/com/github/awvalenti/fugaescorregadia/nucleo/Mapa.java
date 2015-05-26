package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.nucleo.Posicao.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.Elemento.*;

import java.util.HashMap;
import java.util.Map;

import com.google.common.base.Optional;

public abstract class Mapa {

	protected final int numeroLinhas;
	protected final int numeroColunas;
	protected final Map<Posicao, Elemento> elementos;

	protected Mapa(Elemento[][] matriz) {
		numeroLinhas = matriz.length;
		numeroColunas = matriz[0].length;
		elementos = new HashMap<>();

		for (int linha = 0; linha < numeroLinhas; ++linha) {
			for (int coluna = 0; coluna < numeroColunas; ++coluna) {
				elementos.put(aPosicao(linha, coluna), matriz[linha][coluna]);
			}
		}
	}

	protected Mapa(Mapa outro) {
		numeroLinhas = outro.numeroLinhas;
		numeroColunas = outro.numeroColunas;
		elementos = new HashMap<>(outro.elementos);
	}

	public final int getNumeroLinhas() {
		return numeroLinhas;
	}

	public final int getNumeroColunas() {
		return numeroColunas;
	}

	public final Elemento getElemento(Posicao p) {
		return Optional.fromNullable(elementos.get(p)).or(OBSTACULO);
	}

	public final int indiceLinearDe(Posicao posicao) {
		return numeroColunas * posicao.getLinha() + posicao.getColuna();
	}

}