package com.github.awvalenti.fugaescorregadia.programa;

import static com.github.awvalenti.fugaescorregadia.nucleo.Elemento.*;

import com.github.awvalenti.fugaescorregadia.interfacegrafica.TelaJogo;
import com.github.awvalenti.fugaescorregadia.nucleo.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.Mapa;
import com.github.awvalenti.fugaescorregadia.nucleo.MapaImutavel;
import com.github.awvalenti.fugaescorregadia.nucleo.Tentativa;

public class Programa {

	public static void main(String[] args) {
		Mapa mapa = new MapaImutavel(new Elemento[][] {
			{ VAZIO,     VAZIO, PERSONAGEM, VAZIO,     VAZIO, VAZIO, },
			{ OBSTACULO, VAZIO, VAZIO,      OBSTACULO, VAZIO, VAZIO, },
			{ OBSTACULO, VAZIO, VAZIO,      OBSTACULO, VAZIO, VAZIO, },
			{ OBSTACULO, VAZIO, VAZIO,      OBSTACULO, VAZIO, VAZIO, },
		});

		TelaJogo telaJogo = new TelaJogo(mapa);
		telaJogo.setControlavel(new Tentativa(mapa, telaJogo));
		telaJogo.exibir();
	}

}
