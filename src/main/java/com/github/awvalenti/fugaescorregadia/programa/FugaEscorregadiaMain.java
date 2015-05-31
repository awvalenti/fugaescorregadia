package com.github.awvalenti.fugaescorregadia.programa;

import com.github.awvalenti.fugaescorregadia.interfacegrafica.TabuleiroPanel;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.TecladoListener;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.TelaJogo;
import com.github.awvalenti.fugaescorregadia.nucleo.Mapa;
import com.github.awvalenti.fugaescorregadia.nucleo.MapaImutavel;
import com.github.awvalenti.fugaescorregadia.nucleo.Tentativa;

public class FugaEscorregadiaMain {

	public static void main(String[] args) {
		Mapa mapa = new MapaImutavel(""
				+ "_ _ p _ _ _\n"
				+ "o _ _ o _ _\n"
				+ "o _ _ o _ _\n"
				+ "o _ _ o _ _\n"
				+ "");

		TabuleiroPanel tabuleiroPanel = new TabuleiroPanel(50, mapa.getNumeroLinhas(), mapa.getNumeroColunas());
		Tentativa tentativa = new Tentativa(mapa, tabuleiroPanel);
		TelaJogo telaJogo = new TelaJogo(tabuleiroPanel, new TecladoListener(tentativa));
		tentativa.iniciar();
		telaJogo.exibir();
	}

}
