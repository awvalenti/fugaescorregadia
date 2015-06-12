package com.github.awvalenti.fugaescorregadia.componentes;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import com.github.awvalenti.fugaescorregadia.TesteBase;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaImutavel;

public class LeitorDeMapaDoClasspathTest extends TesteBase {

	private LeitorDeMapaDoClasspath leitor;

	@Before
	public void setUp() {
		leitor = obterInstancia(LeitorDeMapaDoClasspath.class);
	}

	@Test
	public void deve_ler_mapa_do_classpath() {
		assertThat(leitor.ler("/mapas/teste.mapa"), is(new MapaImutavel(""
				+ "- p -\n"
				+ "o - -\n"
				+ "")));
	}

}
