package com.github.awvalenti.fugaescorregadia.nucleo.modoeditor;

import java.io.File;

import com.github.awvalenti.fugaescorregadia.componentes.ImportadorExportadorMapa;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeituraEscrita;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;

public class EditorDeMapa implements ControlavelModoEditor {

	private final SaidaModoEditor saida;
	private final ImportadorExportadorMapa impExp;
	private MapaLeituraEscrita mapa;

	public EditorDeMapa(SaidaModoEditor saida, ImportadorExportadorMapa impExp, MapaLeituraEscrita mapa) {
		this.saida = saida;
		this.impExp = impExp;
		this.mapa = mapa;
		iniciar();
	}

	@Override
	public void alterarElemento(Posicao posicao, Elemento novo) {
		mapa.modificarProduzindoSaida(posicao, novo, saida);
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
		saida.novoMapaCarregado(mapa);
	}

}
