package com.github.awvalenti.fugaescorregadia.nucleo;

public class Tentativa implements Controlavel {

	private final SaidaJogo saida;
	private final Tabuleiro tabuleiro;
	private Mapa mapa;

	public Tentativa(Mapa mapa, SaidaJogo saida) {
		this.saida = saida;
		this.tabuleiro = new Tabuleiro(mapa);
		this.mapa = mapa;
	}

	public void iniciar() {
		saida.inicioTentativa(mapa);
		mapa = null;
	}

	@Override
	public void efetuarMovimento(Direcao d) {
		for (;;) {
			Posicao atual = tabuleiro.getPosicaoPersonagem();
			Posicao nova = atual.somar(d);
			if (!tabuleiro.getElemento(nova).permitePassagem(d)) break;
			saida.movimento(atual, nova);
			tabuleiro.setPosicaoPersonagem(nova);
		}
	}

}
