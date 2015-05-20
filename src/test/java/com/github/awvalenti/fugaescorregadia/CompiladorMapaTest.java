package com.github.awvalenti.fugaescorregadia;

import static com.github.awvalenti.fugaescorregadia.Elemento.*;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import com.google.inject.Guice;

public class CompiladorMapaTest {

	private CompiladorMapa compilador;

	@Before
	public void setUp() {
		compilador = Guice.createInjector(InjetorParaTestes.INSTANCIA).getInstance(CompiladorMapa.class);
	}

	@Test
	public void deve_transformar_string_em_mapa() {
		assertThat(compilador.compilar("p _ _ o\n").getMatriz(), is(new Elemento[][] {
			{ PERSONAGEM, VAZIO, VAZIO, OBSTACULO }
		}));
	}

}
