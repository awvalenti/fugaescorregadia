package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.InjetorParaTestes.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.Elemento.*;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import com.google.inject.Injector;

public class MapaTest {

	private Mapa mapa;
	private PosicaoFactory posicoes;

	@Before
	public void setUp() {
		Injector injetor = criarInjetorParaTestes();

		posicoes = injetor.getInstance(PosicaoFactory.class);
		CompiladorMapa compilador = injetor.getInstance(CompiladorMapa.class);
		mapa = compilador.compilar("p _ o\n_ _ _");
	}

	@Test
	public void deve_saber_numero_de_linhas_e_colunas() {
		assertThat(mapa.getNumeroLinhas(), is(2));
		assertThat(mapa.getNumeroColunas(), is(3));
	}

	@Test
	public void deve_obter_elemento_por_posicao() {
		assertThat(mapa.getElemento(posicoes.obter(0, 0)), is(PERSONAGEM));
		assertThat(mapa.getElemento(posicoes.obter(0, 1)), is(VAZIO));
		assertThat(mapa.getElemento(posicoes.obter(0, 2)), is(OBSTACULO));
		assertThat(mapa.getElemento(posicoes.obter(1, 0)), is(VAZIO));
		assertThat(mapa.getElemento(posicoes.obter(1, 1)), is(VAZIO));
		assertThat(mapa.getElemento(posicoes.obter(1, 2)), is(VAZIO));
	}

	@Test
	public void deve_converter_posicao_para_indice_linear() {
		assertThat(mapa.indiceLinearDe(posicoes.obter(0, 0)), is(0));
		assertThat(mapa.indiceLinearDe(posicoes.obter(0, 1)), is(1));
		assertThat(mapa.indiceLinearDe(posicoes.obter(1, 0)), is(3));
		assertThat(mapa.indiceLinearDe(posicoes.obter(1, 1)), is(4));
	}

}
