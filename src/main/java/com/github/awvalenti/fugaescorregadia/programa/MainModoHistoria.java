package com.github.awvalenti.fugaescorregadia.programa;

import static com.github.awvalenti.fugaescorregadia.programa.InjetorProgramaPrincipal.*;

import com.github.awvalenti.fugaescorregadia.componentes.ImportadorExportadorMapa;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.FabricaIcones;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.JanelaJogo;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.modohistoria.ControladorModoHistoria;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.modohistoria.PainelElementosModoHistoria;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;
import com.github.awvalenti.fugaescorregadia.nucleo.modohistoria.Tentativa;

public class MainModoHistoria {

	public static void main(String[] args) {
		ImportadorExportadorMapa impExp = obterInstancia(ImportadorExportadorMapa.class);

		MapaLeitura mapa = impExp.lerDoClasspath("/mapas/00.mapa");

		PainelElementosModoHistoria painel = new PainelElementosModoHistoria(30,
				mapa.getNumeroLinhas(), mapa.getNumeroColunas(),
				obterInstancia(FabricaIcones.class));

		JanelaJogo janela = new JanelaJogo(painel);

		new ControladorModoHistoria(new Tentativa(mapa, painel), janela);

		janela.exibirEmJanela();
	}

}
