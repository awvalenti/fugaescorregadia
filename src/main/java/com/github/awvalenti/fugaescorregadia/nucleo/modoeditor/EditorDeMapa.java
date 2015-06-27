package com.github.awvalenti.fugaescorregadia.nucleo.modoeditor;

import java.io.File;

import com.github.awvalenti.fugaescorregadia.componentes.ImportadorExportadorMapa;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Direcao;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeituraEscrita;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.SaidaMapa;

public class EditorDeMapa implements ControlavelModoEditor {

	private final SaidaMapa saida;
	private final ImportadorExportadorMapa impExp;
	private MapaLeituraEscrita mapa;

	public EditorDeMapa(SaidaMapa saida, ImportadorExportadorMapa impExp, MapaLeituraEscrita mapa) {
		this.saida = saida;
		this.impExp = impExp;
		setMapa(mapa);
	}

	@Override
	public void alterarElemento(Posicao posicao, Elemento novo) {
		mapa.modificar(posicao, novo);
	}

	@Override
	public void rotacionar(Direcao d) {
		mapa.rotacionar(d);
	}

	@Override
	public void novoMapa() {
		setMapa(impExp.criarMapaVazio());
	}

	@Override
	public void salvarMapa(File arquivo) {
		impExp.escreverEmArquivo(arquivo, mapa);
	}

	@Override
	public void carregarMapa(File arquivo) {
		setMapa(impExp.lerDeArquivo(arquivo));
	}

	private void setMapa(MapaLeituraEscrita mapa) {
		this.mapa = mapa;
		mapa.setSaida(saida);
		saida.mapaCompletamenteAlterado(mapa);
	}

}
