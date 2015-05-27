package com.github.awvalenti.fugaescorregadia.nucleo;

public class Tentativa implements Controlavel {

	private final SaidaJogo saida;
	private final Tabuleiro tabuleiro;

	public Tentativa(Mapa mapa, SaidaJogo saida) {
		this.saida = saida;
		this.tabuleiro = new Tabuleiro(mapa);
	}

	@Override
	public void efetuarMovimento(Direcao d) {
		Posicao atual = tabuleiro.getPosicaoPersonagem();

		for (;;) {
			Posicao nova = atual.somar(d);
			if (tabuleiro.getElemento(nova).bloqueiaMovimento()) break;
			saida.movimento(atual, nova);
			atual = nova;
		}
	}

}
