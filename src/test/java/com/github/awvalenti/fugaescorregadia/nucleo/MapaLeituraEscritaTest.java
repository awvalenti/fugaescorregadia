package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Direcao.*;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import com.github.awvalenti.fugaescorregadia.TesteBase;
import com.github.awvalenti.fugaescorregadia.componentes.ImportadorExportadorMapa;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeituraEscrita;

public class MapaLeituraEscritaTest extends TesteBase {

	private MapaLeituraEscrita mapa;
	private ImportadorExportadorMapa impExp;

	@Before
	public void setUp() {
		impExp = obterInstancia(ImportadorExportadorMapa.class);
		mapa = impExp.lerDeString(""
				+ "- p - -\n"
				+ "o o - -\n"
				+ "- < - -\n"
				+ "- v v -\n"
				+ "- - - *\n"
				+ "");
	}

	@Test
	public void deve_saber_rotacionarse_para_esquerda() {
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
	public void deve_saber_rotacionarse_para_direita() {
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
	public void deve_saber_rotacionarse_para_cima() {
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
	public void deve_saber_rotacionarse_para_baixo() {
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
