package com.github.awvalenti.fugaescorregadia.nucleo.comum;

import com.github.awvalenti.fugaescorregadia.nucleo.modohistoria.ControlavelModoHistoria;
import com.github.awvalenti.fugaescorregadia.nucleo.modohistoria.SaidaModoHistoria;

public class Tentativa implements ControlavelModoHistoria {

	private final SaidaModoHistoria saida;
	private final Tabuleiro tabuleiro;
	private MapaLeitura mapa;

	public Tentativa(MapaLeitura mapa, SaidaModoHistoria saida) {
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