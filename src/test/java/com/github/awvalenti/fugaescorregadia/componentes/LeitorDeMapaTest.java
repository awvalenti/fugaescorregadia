package com.github.awvalenti.fugaescorregadia.componentes;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

import java.io.File;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.Test;

import com.github.awvalenti.fugaescorregadia.TesteBase;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaImutavel;

public class LeitorDeMapaTest extends TesteBase {

	private static final String CAMINHO = "/mapas/teste.mapa";
	private static final MapaImutavel MAPA_ESPERADO = new MapaImutavel(""
			+ "- p -\n"
			+ "o - -\n"
			+ "");


	private LeitorDeMapa leitor;

	@Before
	public void setUp() {
		leitor = obterInstancia(LeitorDeMapa.class);
	}

	@Test
	public void deve_ler_mapa_do_classpath() {
		assertThat(leitor.lerDoClasspath(CAMINHO), is(MAPA_ESPERADO));
	}

	@Test
	public void deve_ler_mapa_de_arquivo() throws URISyntaxException {
		File emArquivo = new File(getClass().getResource(CAMINHO).toURI());
		assertThat(leitor.lerDeArquivo(emArquivo), is(MAPA_ESPERADO));
	}

}
