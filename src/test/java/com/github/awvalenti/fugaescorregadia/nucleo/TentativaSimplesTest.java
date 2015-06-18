package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Direcao.*;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

import org.junit.Test;

public class TentativaSimplesTest extends TentativaTest {

	@Override
	protected String obterMapaEmString() {
		return ""
				+ "- - - - o\n"
				+ "- p - - o\n"
				+ "- - - - -\n"
				+ "o o - - -\n"
				+ "";
	}

	@Test
	public final void ao_ser_criada_deve_avisar_saida_jogo() {
		assertThat(saida.iniciou(), is(true));
	}

	@Test
	public void obstaculo_deve_bloquear_movimento() {
		tentativa.efetuarMovimento(DIREITA);
		assertThat(saida.caminhoPercorrido(), is("11 12 12 13"));
	}

	@Test
	public void borda_deve_bloquear_movimento() {
		tentativa.efetuarMovimento(ESQUERDA);
		assertThat(saida.caminhoPercorrido(), is("11 10"));
	}

	@Test
	public void segundo_movimento_deve_partir_de_onde_terminou_o_primeiro() {
		tentativa.efetuarMovimento(CIMA);
		tentativa.efetuarMovimento(BAIXO);
		assertThat(saida.caminhoPercorrido(), is("11 01 01 11 11 21"));
	}

}
