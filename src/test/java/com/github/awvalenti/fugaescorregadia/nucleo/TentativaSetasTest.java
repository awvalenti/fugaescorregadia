package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Direcao.*;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

import org.junit.Test;

public class TentativaSetasTest extends TentativaTest {

	@Override
	protected String obterMapaEmString() {
		return ""
				+ "- - - - - - -\n"
				+ "- - - - - - -\n"
				+ "- - - ^ - - -\n"
				+ "- - < p > - -\n"
				+ "- - - v - - -\n"
				+ "- - - - - - -\n"
				+ "- - - - - - -\n"
				+ "";
	}

	@Test
	public void seta_cima_deve_permitir_movimento_somente_na_direcao_apontada() {
		tentativa.efetuarMovimento(CIMA);
		tentativa.efetuarMovimento(BAIXO);
		assertThat(saida.caminhoPercorrido(), is("33 23 23 13 13 03 03 13"));
	}

	@Test
	public void seta_baixo_deve_permitir_movimento_somente_na_direcao_apontada() {
		tentativa.efetuarMovimento(BAIXO);
		tentativa.efetuarMovimento(CIMA);
		assertThat(saida.caminhoPercorrido(), is("33 43 43 53 53 63 63 53"));
	}

	@Test
	public void seta_esquerda_deve_permitir_movimento_somente_na_direcao_apontada() {
		tentativa.efetuarMovimento(ESQUERDA);
		tentativa.efetuarMovimento(DIREITA);
		assertThat(saida.caminhoPercorrido(), is("33 32 32 31 31 30 30 31"));
	}

	@Test
	public void seta_direita_deve_permitir_movimento_somente_na_direcao_apontada() {
		tentativa.efetuarMovimento(DIREITA);
		tentativa.efetuarMovimento(ESQUERDA);
		assertThat(saida.caminhoPercorrido(), is("33 34 34 35 35 36 36 35"));
	}

}
