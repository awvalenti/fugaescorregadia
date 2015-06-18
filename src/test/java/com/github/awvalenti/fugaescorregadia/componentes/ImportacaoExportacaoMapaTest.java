package com.github.awvalenti.fugaescorregadia.componentes;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.Charset;

import org.junit.Before;
import org.junit.Test;

import com.github.awvalenti.fugaescorregadia.TesteBase;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeituraEscrita;

public class ImportacaoExportacaoMapaTest extends TesteBase {

	private MapaLeitura mapaOriginal;
	private ExportadorMapa exportador;
	private FabricaMapa fabrica;

	@Before
	public void setUp() {
		fabrica = obterInstancia(FabricaMapa.class);
		exportador = obterInstancia(ExportadorMapa.class);
		mapaOriginal = new MapaLeituraEscrita(new Elemento[][] {
			{ VAZIO, PERSONAGEM, VAZIO },
			{ OBSTACULO, VAZIO, VAZIO },
		});
	}

	@Test
	public void ao_exportar_e_importar_de_volta_deve_ficar_igual_ao_original() throws IOException {
		// TODO Melhorar

		File temp = File.createTempFile("fugaescorregadia-teste", ".mapa");
		try (Writer saida = new OutputStreamWriter(new FileOutputStream(temp), Charset.forName("US-ASCII"))) {
			exportador.exportar(saida, mapaOriginal);
		}

		assertThat(fabrica.lerDeArquivo(temp), is(mapaOriginal));
	}

}
