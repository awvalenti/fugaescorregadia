package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.nucleo.Posicao.*;

import java.util.HashMap;
import java.util.Map;

public class Mapa {

	private final Map<Posicao, Elemento> elementos = new HashMap<>();
	private final int numeroLinhas;
	private final int numeroColunas;

	public Mapa(Elemento[][] matriz) {
		numeroLinhas = matriz.length;
		numeroColunas = matriz[0].length;

		for (int linha = 0; linha < matriz.length; ++linha) {
			for (int coluna = 0; coluna < matriz[linha].length; ++coluna) {
				elementos.put(aPosicao(linha, coluna), matriz[linha][coluna]);
			}
		}
	}

	public int getNumeroLinhas() {
		return numeroLinhas;
	}

	public int getNumeroColunas() {
		return numeroColunas;
	}

	public Elemento getElemento(Posicao p) {
		return elementos.get(p);
	}

	public int indiceLinearDe(Posicao posicao) {
		return numeroColunas * posicao.getLinha() + posicao.getColuna();
	}

}
