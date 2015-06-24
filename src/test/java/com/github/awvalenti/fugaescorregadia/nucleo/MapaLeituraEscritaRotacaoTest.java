package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Direcao.*;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import org.junit.Test;

public class MapaLeituraEscritaRotacaoTest extends MapaLeituraEscritaTest {

	@Test
	public void deve_produzir_saida_ao_rotacionar() {
		mapa.rotacionar(ESQUERDA);
		verify(saida).mapaCompletamenteAlterado(impExp.lerDeString(""
				+ "p - - -\n"
				+ "o - - o\n"
				+ "< - - -\n"
				+ "v v - -\n"
				+ "- - * -\n"
				+ ""));
		verifyNoMoreInteractions(saida);
	}

	@Test
	public void deve_rotacionar_para_esquerda() {
		mapa.rotacionar(ESQUERDA);
		assertThat(mapa, is(impExp.lerDeString(""
				+ "p - - -\n"
				+ "o - - o\n"
				+ "< - - -\n"
				+ "v v - -\n"
				+ "- - * -\n"
				+ "")));
	}

	@Test
	public void deve_rotacionar_para_direita() {
		mapa.rotacionar(DIREITA);
		assertThat(mapa, is(impExp.lerDeString(""
				+ "- - p -\n"
				+ "- o o -\n"
				+ "- - < -\n"
				+ "- - v v\n"
				+ "* - - -\n"
				+ "")));
	}

	@Test
	public void deve_rotacionar_para_cima() {
		mapa.rotacionar(CIMA);
		assertThat(mapa, is(impExp.lerDeString(""
				+ "o o - -\n"
				+ "- < - -\n"
				+ "- v v -\n"
				+ "- - - *\n"
				+ "- p - -\n"
				+ "")));
	}

	@Test
	public void deve_rotacionar_para_baixo() {
		mapa.rotacionar(BAIXO);
		assertThat(mapa, is(impExp.lerDeString(""
				+ "- - - *\n"
				+ "- p - -\n"
				+ "o o - -\n"
				+ "- < - -\n"
				+ "- v v -\n"
				+ "")));
	}

}
