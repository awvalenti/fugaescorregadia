package com.github.awvalenti.fugaescorregadia.nucleo.comum;

import com.github.awvalenti.fugaescorregadia.nucleo.modohistoria.ControlavelModoHistoria;
import com.github.awvalenti.fugaescorregadia.nucleo.modohistoria.SaidaTentativa;

public class Tentativa implements ControlavelModoHistoria {

	private final Tabuleiro tabuleiro;
	private final SaidaTentativa saida;

	public Tentativa(MapaLeitura mapa, SaidaTentativa saida) {
		this.saida = saida;
		this.tabuleiro = new Tabuleiro(mapa);
		saida.inicioTentativa(mapa);
	}

	@Override
	public void efetuarMovimento(Direcao d) {
		for (;;) {
			Posicao origem = tabuleiro.getPosicaoPersonagem();
			Posicao destino = origem.somar(d);
			Elemento elementoAlcancado = tabuleiro.getElemento(destino);
			if (!elementoAlcancado.permitePassagem(d)) break;
			saida.movimento(origem, tabuleiro.getElemento(origem), destino);
			tabuleiro.setPosicaoPersonagem(destino);
			if (elementoAlcancado.fazPassarDeFase()) {
				saida.passagemDeFase();
				break;
			}
		}
	}

}
