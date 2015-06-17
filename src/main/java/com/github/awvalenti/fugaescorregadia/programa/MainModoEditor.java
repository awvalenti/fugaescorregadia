package com.github.awvalenti.fugaescorregadia.programa;

import static com.github.awvalenti.fugaescorregadia.programa.InjetorProgramaPrincipal.*;

import com.github.awvalenti.fugaescorregadia.componentes.LeitorDeMapa;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.FabricaIcones;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.JanelaJogo;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.modoeditor.ControladorModoEditor;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.modoeditor.MapeamentoDeTeclaParaElemento;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.modoeditor.PainelTabuleiroModoEditor;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeituraEscrita;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;
import com.github.awvalenti.fugaescorregadia.nucleo.modoeditor.EditorDeMapa;

public class MainModoEditor {

	public static void main(String[] args) {
		LeitorDeMapa leitorDeMapa = obterInstancia(LeitorDeMapa.class);

		MapaLeitura mapa = leitorDeMapa.lerDoClasspath("/mapas/vazio.mapa");

		PainelTabuleiroModoEditor painel = new PainelTabuleiroModoEditor(30,
				mapa.getNumeroLinhas(), mapa.getNumeroColunas(),
				obterInstancia(FabricaIcones.class));

		EditorDeMapa editor = new EditorDeMapa(mapa, painel, leitorDeMapa);

		JanelaJogo telaJogo = new JanelaJogo(painel);

		new ControladorModoEditor(editor, telaJogo, painel, painel,
				obterInstancia(MapeamentoDeTeclaParaElemento.class));

		editor.iniciar();

		telaJogo.exibirEmJanela();
	}

}
