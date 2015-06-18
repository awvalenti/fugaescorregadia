package com.github.awvalenti.fugaescorregadia.programa;

import static com.github.awvalenti.fugaescorregadia.programa.InjetorProgramaPrincipal.*;

import com.github.awvalenti.fugaescorregadia.componentes.FabricaMapa;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.FabricaIcones;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.JanelaJogo;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.modohistoria.ControladorModoHistoria;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.modohistoria.PainelTabuleiroModoHistoria;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Tentativa;

public class MainModoHistoria {

	public static void main(String[] args) {
		FabricaMapa fabricaMapa = obterInstancia(FabricaMapa.class);

		MapaLeitura mapa = fabricaMapa.lerDoClasspath("/mapas/01.mapa");

		PainelTabuleiroModoHistoria painelTabuleiro = new PainelTabuleiroModoHistoria(
				30, mapa.getNumeroLinhas(), mapa.getNumeroColunas(),
				obterInstancia(FabricaIcones.class));

		JanelaJogo telaJogo = new JanelaJogo(painelTabuleiro);

		new ControladorModoHistoria(new Tentativa(mapa, painelTabuleiro), telaJogo);

		telaJogo.exibirEmJanela();
	}

}
