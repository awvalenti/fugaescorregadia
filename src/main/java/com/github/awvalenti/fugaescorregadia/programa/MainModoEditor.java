package com.github.awvalenti.fugaescorregadia.programa;

import static com.github.awvalenti.fugaescorregadia.programa.InjetorProgramaPrincipal.*;

import java.io.File;

import com.github.awvalenti.fugaescorregadia.componentes.ImportadorExportadorMapa;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.FabricaIcones;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.JanelaJogo;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.modoeditor.ControladorModoEditor;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.modoeditor.MapeamentoDeTeclaParaElemento;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.modoeditor.PainelElementosModoEditor;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeituraEscrita;
import com.github.awvalenti.fugaescorregadia.nucleo.modoeditor.EditorDeMapa;

public class MainModoEditor {

	public static void main(String[] args) {
		ImportadorExportadorMapa impExp = obterInstancia(ImportadorExportadorMapa.class);

		MapaLeituraEscrita mapa = impExp.criarMapaVazio();

		PainelElementosModoEditor painel = new PainelElementosModoEditor(mapa.getNumeroLinhas(),
				mapa.getNumeroColunas(), obterInstancia(FabricaIcones.class));

		JanelaJogo janela = new JanelaJogo(painel);

		new ControladorModoEditor(new EditorDeMapa(painel, impExp, mapa), janela, painel, painel,
				obterInstancia(MapeamentoDeTeclaParaElemento.class), args.length > 0 ? new File(
						args[0]) : null);

		janela.exibirEmJanela();
	}

}
