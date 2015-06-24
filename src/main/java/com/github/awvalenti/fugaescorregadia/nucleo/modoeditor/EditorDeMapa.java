package com.github.awvalenti.fugaescorregadia.nucleo.modoeditor;

import java.io.File;

import com.github.awvalenti.fugaescorregadia.componentes.ImportadorExportadorMapa;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Direcao;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeituraEscrita;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.SaidaMapaEscrita;

public class EditorDeMapa implements ControlavelModoEditor {

	private final SaidaMapaEscrita saida;
	private final ImportadorExportadorMapa impExp;
	private MapaLeituraEscrita mapa;

	public EditorDeMapa(SaidaMapaEscrita saida, ImportadorExportadorMapa impExp, MapaLeituraEscrita mapa) {
		this.saida = saida;
		this.impExp = impExp;
		this.mapa = mapa;
		mapa.setSaida(saida);
		iniciar();
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
	public void salvarMapa(File arquivo) {
		impExp.escreverEmArquivo(arquivo, mapa);
	}

	@Override
	public void carregarMapa(File arquivo) {
		mapa = impExp.lerDeArquivo(arquivo);
		iniciar();
	}

	private void iniciar() {
		saida.mapaCompletamenteAlterado(mapa);
	}

}
