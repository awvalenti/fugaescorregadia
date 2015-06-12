package com.github.awvalenti.fugaescorregadia.nucleo;

public class Tentativa implements ControlavelModoHistoria {

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
			Posicao origem = tabuleiro.getPosicaoPersonagem();
			Posicao destino = origem.somar(d);
			if (!tabuleiro.getElemento(destino).permitePassagem(d)) break;
			saida.movimento(origem, tabuleiro.getElemento(origem), destino);
			tabuleiro.setPosicaoPersonagem(destino);
		}
	}

}
