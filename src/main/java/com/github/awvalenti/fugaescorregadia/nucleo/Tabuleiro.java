package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.nucleo.Elemento.*;

public class Tabuleiro extends Mapa {

	private Posicao posicaoPersonagem;

	public Tabuleiro(Mapa mapa) {
		super(mapa);

		posicaoPersonagem = elementos.entrySet().stream()
				.filter(entry -> entry.getValue() == PERSONAGEM)
				.findFirst().get().getKey();

		elementos.put(posicaoPersonagem, VAZIO);
	}

	public void setElemento(Posicao p, Elemento novo) {
		elementos.put(p, novo);
	}

	public Posicao getPosicaoPersonagem() {
		return posicaoPersonagem;
	}

	public void setPosicaoPersonagem(Posicao posicaoPersonagem) {
		this.posicaoPersonagem = posicaoPersonagem;
	}

}
