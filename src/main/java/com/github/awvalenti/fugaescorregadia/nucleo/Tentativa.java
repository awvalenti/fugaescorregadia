package com.github.awvalenti.fugaescorregadia.nucleo;

public class Tentativa {

	private final SaidaJogo saida;
	private final Tabuleiro tabuleiro;

	public Tentativa(Mapa mapa, SaidaJogo saida) {
		this.saida = saida;
		this.tabuleiro = new Tabuleiro(mapa);
	}

	public void efetuarMovimento(Direcao d) {
		Posicao atual = tabuleiro.getPosicaoPersonagem();

		for (;;) {
			atual = atual.somar(d);
			if (tabuleiro.getElemento(atual).bloqueiaMovimento()) break;
			saida.movimento(atual);
		}
	}

}
