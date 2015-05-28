package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.nucleo.Elemento.*;

public class Tentativa implements Controlavel {

	private final SaidaJogo saida;
	private final Tabuleiro tabuleiro;

	public Tentativa(Mapa mapa, SaidaJogo saida) {
		this.saida = saida;
		this.tabuleiro = new Tabuleiro(mapa);
	}

	@Override
	public void efetuarMovimento(Direcao d) {
		for (;;) {
			Posicao atual = tabuleiro.getPosicaoPersonagem();
			Posicao nova = atual.somar(d);
			if (tabuleiro.getElemento(nova).bloqueiaMovimento()) break;
			saida.movimento(atual, nova);
			tabuleiro.setElemento(atual, VAZIO);
			tabuleiro.setElemento(nova, PERSONAGEM);
		}
	}

}
