package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.nucleo.Elemento.*;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import com.github.awvalenti.fugaescorregadia.InjetorParaTestes;
import com.google.inject.Guice;

public class CompiladorMapaTest {

	private CompiladorMapa compilador;

	@Before
	public void setUp() {
		compilador = Guice.createInjector(InjetorParaTestes.INSTANCIA).getInstance(CompiladorMapa.class);
	}

	@Test
	public void deve_transformar_string_em_mapa() {
		Mapa mapa = compilador.compilar("p _ _ o\n");
		assertThat(mapa.getNumeroLinhas(), is(1));
		assertThat(mapa.getNumeroColunas(), is(4));
		assertThat(mapa.getElemento(new Posicao(0, 0)), is(PERSONAGEM));
		assertThat(mapa.getElemento(new Posicao(0, 1)), is(VAZIO));
		assertThat(mapa.getElemento(new Posicao(0, 2)), is(VAZIO));
		assertThat(mapa.getElemento(new Posicao(0, 3)), is(OBSTACULO));
	}

}
