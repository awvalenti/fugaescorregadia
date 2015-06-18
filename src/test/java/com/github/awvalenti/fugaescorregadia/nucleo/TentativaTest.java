package com.github.awvalenti.fugaescorregadia.nucleo;

import org.junit.Before;

import com.github.awvalenti.fugaescorregadia.TesteBase;
import com.github.awvalenti.fugaescorregadia.componentes.FabricaMapa;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Tentativa;
import com.github.awvalenti.fugaescorregadia.nucleo.modohistoria.SaidaModoHistoria;

public abstract class TentativaTest extends TesteBase {

	protected Tentativa tentativa;
	protected SaidaSpy saida;
	protected MapaLeitura mapa;

	@Before
	public final void setUp() {
		mapa = obterInstancia(FabricaMapa.class).lerDeString(obterMapaEmString());
		saida = new SaidaSpy();
		tentativa = new Tentativa(mapa, saida);
	}

	protected abstract String obterMapaEmString();

	public static class SaidaSpy implements SaidaModoHistoria {

		private final StringBuilder caminho = new StringBuilder();
		private boolean iniciou = false;

		public String caminhoPercorrido() {
			return caminho.substring(0, caminho.length() - 1);
		}

		public boolean iniciou() {
			return iniciou;
		}

		@Override
		public void movimento(Posicao origem, Elemento elementoNaOrigem, Posicao destino) {
			caminharPor(origem);
			caminharPor(destino);
		}

		@Override
		public void inicioTentativa(MapaLeitura mapa) {
			iniciou = true;
		}

		private void caminharPor(Posicao p) {
			caminho.append(p.getLinha()).append(p.getColuna()).append(' ');
		}
	}

}