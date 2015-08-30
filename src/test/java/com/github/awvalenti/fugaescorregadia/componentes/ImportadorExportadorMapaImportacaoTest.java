package com.github.awvalenti.fugaescorregadia.componentes;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

import java.io.File;
import java.net.URISyntaxException;

import org.junit.Test;

public class ImportadorExportadorMapaImportacaoTest extends ImportadorExportadorMapaTest {

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

}
