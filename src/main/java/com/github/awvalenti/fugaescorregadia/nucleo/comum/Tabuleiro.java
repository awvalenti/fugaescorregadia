package com.github.awvalenti.fugaescorregadia.nucleo.comum;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;

public class Tabuleiro {

	// TODO Duas camadas de matrizes de elementos
	private final MapaLeituraEscrita mapa;
	private Posicao posicaoPersonagem;

	public Tabuleiro(MapaLeitura mapaACopiar) {
		mapa = new MapaLeituraEscrita(mapaACopiar);
		posicaoPersonagem = mapa.buscar(PERSONAGEM).get();
		mapa.modificar(posicaoPersonagem, VAZIO);
	}

	public Posicao getPosicaoPersonagem() {
		return posicaoPersonagem;
	}

	public void setPosicaoPersonagem(Posicao posicaoPersonagem) {
		this.posicaoPersonagem = posicaoPersonagem;
	}

	public Elemento getElemento(Posicao p) {
		return mapa.getElemento(p);
	}

}
