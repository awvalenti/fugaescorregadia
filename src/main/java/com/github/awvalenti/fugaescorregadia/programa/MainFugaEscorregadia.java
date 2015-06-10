package com.github.awvalenti.fugaescorregadia.programa;

import com.github.awvalenti.fugaescorregadia.componentes.LeitorDeMapaDoClasspath;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.PainelTabuleiro;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.TecladoListener;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.JanelaJogo;
import com.github.awvalenti.fugaescorregadia.nucleo.Mapa;
import com.github.awvalenti.fugaescorregadia.nucleo.Tentativa;

public class MainFugaEscorregadia {

	public static void main(String[] args) {
		Mapa mapa = new LeitorDeMapaDoClasspath().ler("/mapas/01.mapa");

		PainelTabuleiro painelTabuleiro = new PainelTabuleiro(30, mapa.getNumeroLinhas(), mapa.getNumeroColunas());
		Tentativa tentativa = new Tentativa(mapa, painelTabuleiro);
		JanelaJogo telaJogo = new JanelaJogo(painelTabuleiro, new TecladoListener(tentativa));
		tentativa.iniciar();
		telaJogo.exibir();
	}

}
