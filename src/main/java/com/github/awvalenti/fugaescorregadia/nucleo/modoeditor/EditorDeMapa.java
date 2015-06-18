package com.github.awvalenti.fugaescorregadia.nucleo.modoeditor;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.Charset;

import com.github.awvalenti.fugaescorregadia.componentes.ExportadorMapa;
import com.github.awvalenti.fugaescorregadia.componentes.FabricaMapa;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeituraEscrita;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;

public class EditorDeMapa implements ControlavelModoEditor {

	private final SaidaModoEditor saida;
	private final FabricaMapa fabrica;
	private final ExportadorMapa exportador;
	private MapaLeituraEscrita mapa;

	public EditorDeMapa(SaidaModoEditor saida, MapaLeituraEscrita mapa, FabricaMapa fabrica,
			ExportadorMapa exportador) {
		this.saida = saida;
		this.fabrica = fabrica;
		this.exportador = exportador;
		this.mapa = mapa;
		iniciar();
	}

	@Override
	public void alterarElemento(Posicao posicao, Elemento novo) {
		mapa.modificarProduzindoSaida(posicao, novo, saida);
	}

	@Override
	public void salvarMapa(File arquivo) {
		// TODO Usar uma classe extra para ocultar detalhes como ASCII
		try (Writer escritor = new OutputStreamWriter(new FileOutputStream(arquivo), Charset.forName("US-ASCII"))) {
			exportador.exportar(escritor, mapa);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public void carregarMapa(File arquivo) {
		mapa = fabrica.lerDeArquivo(arquivo);
		iniciar();
	}

	private void iniciar() {
		saida.novoMapaCarregado(mapa);
	}

}
