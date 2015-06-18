package com.github.awvalenti.fugaescorregadia.nucleo.modoeditor;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;

import com.github.awvalenti.fugaescorregadia.componentes.FabricaMapa;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeituraEscrita;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;
import com.google.common.io.Files;

public class EditorDeMapa implements ControlavelModoEditor {

	private MapaLeituraEscrita mapa;
	private final SaidaModoEditor saida;
	private final FabricaMapa fabricaMapa;

	public EditorDeMapa(SaidaModoEditor saida, FabricaMapa fabricaMapa) {
		this.saida = saida;
		this.fabricaMapa = fabricaMapa;
		this.mapa = fabricaMapa.criarMapaVazio();
	}

	public void iniciar() {
		saida.inicioEdicao(mapa);
	}

	@Override
	public void alterarElemento(Posicao posicao, Elemento novo) {
		mapa.setElemento(posicao, novo);
		saida.tabuleiroAlterado(posicao, novo);
	}

	@Override
	public void salvarMapa(File arquivo) {
		try {
			// TODO Melhorar. Evitar com.google.common.io.Files.
			Files.write(mapa.toString(), arquivo, Charset.forName("US-ASCII"));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public void carregarMapa(File arquivo) {
		mapa = fabricaMapa.lerDeArquivo(arquivo);
		iniciar();
	}

}
