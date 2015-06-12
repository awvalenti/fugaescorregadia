package com.github.awvalenti.fugaescorregadia.programa;

import com.github.awvalenti.fugaescorregadia.componentes.LeitorDeMapaDoClasspath;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.FabricaIcones;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.JanelaJogo;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.modohistoria.ControladorModoHistoria;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.modohistoria.PainelTabuleiroModoHistoria;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Mapa;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Tentativa;

public class MainModoHistoria {

	public static void main(String[] args) {
		Mapa mapa = new LeitorDeMapaDoClasspath().ler("/mapas/01.mapa");

		PainelTabuleiroModoHistoria painelTabuleiro = new PainelTabuleiroModoHistoria(
				30, mapa.getNumeroLinhas(), mapa.getNumeroColunas(),
				new FabricaIcones());

		Tentativa tentativa = new Tentativa(mapa, painelTabuleiro);

		JanelaJogo telaJogo = new JanelaJogo(painelTabuleiro);

		new ControladorModoHistoria(tentativa, telaJogo);

		tentativa.iniciar();

		telaJogo.exibirEmJanela();
	}

}
