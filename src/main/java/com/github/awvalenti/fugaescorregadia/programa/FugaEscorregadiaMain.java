package com.github.awvalenti.fugaescorregadia.programa;

import static com.github.awvalenti.fugaescorregadia.nucleo.Elemento.*;

import com.github.awvalenti.fugaescorregadia.interfacegrafica.TabuleiroPanel;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.TecladoListener;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.TelaJogo;
import com.github.awvalenti.fugaescorregadia.nucleo.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.Mapa;
import com.github.awvalenti.fugaescorregadia.nucleo.MapaImutavel;
import com.github.awvalenti.fugaescorregadia.nucleo.Tentativa;

public class FugaEscorregadiaMain {

	public static void main(String[] args) {
		Mapa mapa = new MapaImutavel(new Elemento[][] {
			{ VAZIO,     VAZIO, PERSONAGEM, VAZIO,     VAZIO, VAZIO, },
			{ OBSTACULO, VAZIO, VAZIO,      OBSTACULO, VAZIO, VAZIO, },
			{ OBSTACULO, VAZIO, VAZIO,      OBSTACULO, VAZIO, VAZIO, },
			{ OBSTACULO, VAZIO, VAZIO,      OBSTACULO, VAZIO, VAZIO, },
		});

		TabuleiroPanel tabuleiroPanel = new TabuleiroPanel(mapa);
		TelaJogo telaJogo = new TelaJogo(tabuleiroPanel, new TecladoListener(new Tentativa(mapa, tabuleiroPanel)));
		telaJogo.exibir();
	}

}
