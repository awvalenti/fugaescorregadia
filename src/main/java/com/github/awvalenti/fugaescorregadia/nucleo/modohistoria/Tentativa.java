package com.github.awvalenti.fugaescorregadia.nucleo.modohistoria;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Direcao;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;

public class Tentativa implements ControlavelModoHistoria {

	private final Tabuleiro tabuleiro;
	private final SaidaTentativa saida;

	public Tentativa(MapaLeitura mapa, SaidaTentativa saida) {
		this.tabuleiro = new Tabuleiro(mapa);
		this.saida = saida;
		saida.inicioTentativa(mapa, tabuleiro.getPosicaoPersonagem());
	}

	@Override
	public void efetuarMovimento(Direcao d) {
		for (;;) {
			Posicao origem = tabuleiro.getPosicaoPersonagem();
			Posicao destino = origem.somar(d);
			Elemento elementoAlcancado = tabuleiro.getElemento(destino);

			if (elementoAlcancado.bloqueiaEntrada(d)) break;

			saida.movimento(origem, tabuleiro.getElemento(origem), destino);
			tabuleiro.setPosicaoPersonagem(destino);

			if (elementoAlcancado.fazPassarDeFase()) saida.passagemDeFase();
			if (elementoAlcancado.bloqueiaSaidaImediata()) break;
		}
	}

}
