package com.github.awvalenti.fugaescorregadia.componentes;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.Test;

import com.github.awvalenti.fugaescorregadia.TesteBase;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeituraEscrita;

public class ImportadorExportadorMapaTest extends TesteBase {

	private MapaLeitura mapaTeste;
	private ImportadorExportadorMapa impExp;

	@Before
	public void setUp() {
		impExp = obterInstancia(ImportadorExportadorMapa.class);
		mapaTeste = new MapaLeituraEscrita(new Elemento[][] {
			{ VAZIO, PARTIDA, VAZIO },
			{ OBSTACULO, VAZIO, VAZIO },
		});
	}

	@Test
	public void deve_ler_mapa_de_string() {
		String mapaEmString = ""
				+ "- p -\n"
				+ "o - -\n"
				+ "";
		assertThat(impExp.lerDeString(mapaEmString), is(mapaTeste));
	}

	@Test
	public void deve_ler_mapa_do_classpath() {
		assertThat(impExp.lerDoClasspath("/mapas/teste.mapa"), is(mapaTeste));
	}

	@Test
	public void deve_ler_mapa_de_arquivo() throws URISyntaxException {
		File emArquivo = new File(getClass().getResource("/mapas/teste.mapa").toURI());
		assertThat(impExp.lerDeArquivo(emArquivo), is(mapaTeste));
	}

	@Test
	public void ao_exportar_e_importar_de_volta_deve_ficar_igual_ao_original() throws IOException {
		File temp = File.createTempFile("fugaescorregadia-teste", ".mapa");
		impExp.escreverEmArquivo(temp, mapaTeste);
		assertThat(impExp.lerDeArquivo(temp), is(mapaTeste));
	}

}
