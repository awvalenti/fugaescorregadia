package com.github.awvalenti.fugaescorregadia.programa;

import static com.github.awvalenti.fugaescorregadia.programa.InjetorProgramaPrincipal.*;

import com.github.awvalenti.fugaescorregadia.componentes.ImportadorExportadorMapa;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.FabricaIcones;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.JanelaJogo;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.modohistoria.ControladorModoHistoria;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.modohistoria.PainelElementosModoHistoria;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Tentativa;

public class MainModoHistoria {

	public static void main(String[] args) {
		ImportadorExportadorMapa impExp = obterInstancia(ImportadorExportadorMapa.class);

		MapaLeitura mapa = impExp.lerDoClasspath("/mapas/01.mapa");

		PainelElementosModoHistoria painelTabuleiro = new PainelElementosModoHistoria(
				30, mapa.getNumeroLinhas(), mapa.getNumeroColunas(),
				obterInstancia(FabricaIcones.class));

		JanelaJogo telaJogo = new JanelaJogo(painelTabuleiro);

		new ControladorModoHistoria(new Tentativa(mapa, painelTabuleiro), telaJogo);

		telaJogo.exibirEmJanela();
	}

}
