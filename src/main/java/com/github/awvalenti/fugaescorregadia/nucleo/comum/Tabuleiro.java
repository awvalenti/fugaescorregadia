package com.github.awvalenti.fugaescorregadia.nucleo.comum;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;

public class Tabuleiro {

	// TODO Duas camadas de matrizes de elementos
	private final MapaLeituraEscrita mapa;
	private Posicao posicaoPersonagem;

	public Tabuleiro(MapaLeitura mapaACopiar) {
		mapa = new MapaLeituraEscrita(mapaACopiar);
		posicaoPersonagem = mapa.encontrar(PERSONAGEM).get();
		mapa.modificarSemProduzirSaida(posicaoPersonagem, VAZIO);
	}

	public Posicao getPosicaoPersonagem() {
		return posicaoPersonagem;
	}

	public void setPosicaoPersonagem(Posicao posicaoPersonagem) {
		this.posicaoPersonagem = posicaoPersonagem;
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();

		// FIXME Incluir personagem
//		for (List<Elemento> linha : matriz) {
//			for (Elemento elemento : linha) {
//				sb.append(elemento.getCaractereDoMapaEmString()).append(' ');
//			}
//			sb.append('\n');
//		}

		return sb.toString();
	}

	public Elemento getElemento(Posicao p) {
		return mapa.getElemento(p);
	}

}
