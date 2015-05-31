package com.github.awvalenti.fugaescorregadia.programa;

import com.github.awvalenti.fugaescorregadia.componentes.LeitorDeMapaDoClasspath;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.TabuleiroPanel;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.TecladoListener;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.TelaJogo;
import com.github.awvalenti.fugaescorregadia.nucleo.Mapa;
import com.github.awvalenti.fugaescorregadia.nucleo.Tentativa;

public class MainFugaEscorregadia {

	public static void main(String[] args) {
		Mapa mapa = new LeitorDeMapaDoClasspath().ler("/mapas/01.mapa");

		TabuleiroPanel tabuleiroPanel = new TabuleiroPanel(30, mapa.getNumeroLinhas(), mapa.getNumeroColunas());
		Tentativa tentativa = new Tentativa(mapa, tabuleiroPanel);
		TelaJogo telaJogo = new TelaJogo(tabuleiroPanel, new TecladoListener(tentativa));
		tentativa.iniciar();
		telaJogo.exibir();
	}

}
