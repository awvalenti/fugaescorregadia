package com.github.awvalenti.fugaescorregadia.programa;

import com.github.awvalenti.fugaescorregadia.componentes.LeitorDeMapaDoClasspath;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.FabricaIcones;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.JanelaJogo;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.modoeditor.ControladorModoEditorPeloTeclado;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.modoeditor.PainelTabuleiroModoEditor;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Mapa;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Tabuleiro;
import com.github.awvalenti.fugaescorregadia.nucleo.modoeditor.EditorDeFase;

public class MainModoEditor {

	public static void main(String[] args) {
		Mapa mapa = new LeitorDeMapaDoClasspath().ler("/mapas/vazio.mapa");

		PainelTabuleiroModoEditor painel = new PainelTabuleiroModoEditor(30,
				mapa.getNumeroLinhas(), mapa.getNumeroColunas(),
				new FabricaIcones());

		Tabuleiro tabuleiro = new Tabuleiro(mapa);

		EditorDeFase editor = new EditorDeFase(tabuleiro, painel);

		JanelaJogo telaJogo = new JanelaJogo(painel,
				new ControladorModoEditorPeloTeclado(editor));

		editor.iniciar();

		telaJogo.exibirEmJanela();
	}

}
