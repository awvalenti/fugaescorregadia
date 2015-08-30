package com.github.awvalenti.fugaescorregadia.componentes;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class ImportadorExportadorMapaExportacaoTest extends ImportadorExportadorMapaTest {

	private File temp;

	@Before
	public void criarArquivoTemporario() throws IOException {
		temp = File.createTempFile("fugaescorregadia-teste", ".mapa");
	}

	@Test
	public void ao_exportar_e_importar_de_volta_deve_ficar_igual_ao_original() {
		impExp.escreverEmArquivo(temp, mapaTeste);
		assertThat(impExp.lerDeArquivo(temp), is(mapaTeste));
	}

	@After
	public void excluirArquivoTemporario() throws IOException {
		Files.delete(Paths.get(temp.toURI()));
	}

}
