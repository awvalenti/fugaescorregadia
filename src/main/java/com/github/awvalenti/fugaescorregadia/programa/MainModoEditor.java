package com.github.awvalenti.fugaescorregadia.programa;

import com.github.awvalenti.fugaescorregadia.componentes.LeitorDeMapa;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.FabricaIcones;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.JanelaJogo;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.modoeditor.ControladorModoEditor;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.modoeditor.PainelTabuleiroModoEditor;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.modoeditor.MapeamentoDeTeclaParaElemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Mapa;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Tabuleiro;
import com.github.awvalenti.fugaescorregadia.nucleo.modoeditor.EditorDeFase;

public class MainModoEditor {

	public static void main(String[] args) {
		Mapa mapa = new LeitorDeMapa().lerDoClasspath("/mapas/vazio.mapa");

		PainelTabuleiroModoEditor painel = new PainelTabuleiroModoEditor(30,
				mapa.getNumeroLinhas(), mapa.getNumeroColunas(),
				new FabricaIcones());

		Tabuleiro tabuleiro = new Tabuleiro(mapa);

		EditorDeFase editor = new EditorDeFase(tabuleiro, painel);

		JanelaJogo telaJogo = new JanelaJogo(painel);

		new ControladorModoEditor(editor, telaJogo, painel, painel, new MapeamentoDeTeclaParaElemento());

		editor.iniciar();

		telaJogo.exibirEmJanela();
	}

}
