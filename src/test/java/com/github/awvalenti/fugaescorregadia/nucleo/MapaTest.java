package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.nucleo.Elemento.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.Posicao.*;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import com.github.awvalenti.fugaescorregadia.TesteBase;

public class MapaTest extends TesteBase {

	private Mapa mapa;

	@Before
	public void setUp() {
		mapa = new MapaImutavel("p _ o\n_ _ _");
	}

	@Test
	public void deve_saber_numero_de_linhas_e_colunas() {
		assertThat(mapa.getNumeroLinhas(), is(2));
		assertThat(mapa.getNumeroColunas(), is(3));
	}

	@Test
	public void deve_obter_elemento_por_posicao() {
		assertThat(mapa.getElemento(aPosicao(0, 0)), is(PERSONAGEM));
		assertThat(mapa.getElemento(aPosicao(0, 1)), is(VAZIO));
		assertThat(mapa.getElemento(aPosicao(0, 2)), is(OBSTACULO));
		assertThat(mapa.getElemento(aPosicao(1, 0)), is(VAZIO));
		assertThat(mapa.getElemento(aPosicao(1, 1)), is(VAZIO));
		assertThat(mapa.getElemento(aPosicao(1, 2)), is(VAZIO));
	}

}
