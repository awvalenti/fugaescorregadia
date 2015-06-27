package com.github.awvalenti.fugaescorregadia.nucleo.modohistoria;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeituraEscrita;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;

public class Tabuleiro {

	// TODO Duas camadas de matrizes de elementos
	private final MapaLeituraEscrita mapa;
	private Posicao posicaoPersonagem;

	public Tabuleiro(MapaLeitura mapaACopiar) {
		mapa = new MapaLeituraEscrita(mapaACopiar);
		posicaoPersonagem = mapa.buscar(PARTIDA).get();
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
