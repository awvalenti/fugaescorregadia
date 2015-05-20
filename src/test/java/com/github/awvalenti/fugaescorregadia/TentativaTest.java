package com.github.awvalenti.fugaescorregadia;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import com.github.awvalenti.fugaescorregadia.Tentativa;

public class TentativaTest {

	private Tentativa tentativa;

	@Before
	public void setUp() {
		tentativa = new Tentativa(""
				+ "p _ _ o\n"
				+ "_ _ _ _\n"
				+ "_ _ _ _\n"
				+ "o _ _ _\n"
				);
	}

	@Test
	public void deve_andar_para_direita() {
		tentativa.moversePara("direita");
		assertThat(tentativa.posicao(), is(new Posicao(0, 2)));
	}

	@Test
	@Ignore
	public void deve_andar_para_baixo() {
		tentativa.moversePara("baixo");
		assertThat(tentativa.posicao(), is(new Posicao(2, 0)));
	}

}
