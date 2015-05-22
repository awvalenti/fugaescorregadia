package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.nucleo.Posicao.*;

public class Tentativa {

	private final SaidaJogo saida;

	public Tentativa(Mapa mapa, SaidaJogo saida) {
		this.saida = saida;
	}

	public void efetuarMovimento(Direcao d) {
		saida.movimento(aPosicao(0, 3));
	}

}
