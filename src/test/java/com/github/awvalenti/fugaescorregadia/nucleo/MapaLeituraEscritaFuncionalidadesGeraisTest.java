package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao.*;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.Test;

public class MapaLeituraEscritaFuncionalidadesGeraisTest extends MapaLeituraEscritaTest {

	@Test
	public void situacao_inicial() {
		assertThat(mapa.getElemento(aPosicao(0, 1)), is(PERSONAGEM));
		assertThat(mapa.getElemento(aPosicao(0, 2)), is(VAZIO));
	}

	@Test
	public void deve_buscar_elemento() {
		assertThat(mapa.buscar(PERSONAGEM), is(Optional.of(aPosicao(0, 1))));
	}

	@Test
	public void deve_informar_uma_alteracao_ao_modificar_elementos_do_tipo_mais_de_um_por_mapa() {
		mapa.modificar(aPosicao(0, 2), OBSTACULO);
		verify(saida).elementoAlterado(aPosicao(0, 2), OBSTACULO);
		verifyNoMoreInteractions(saida);
		assertThat(mapa.getElemento(aPosicao(0, 2)), is(OBSTACULO));
	}

	@Test
	public void deve_informar_duas_alteracoes_ao_modificar_elementos_do_tipo_somente_um_por_mapa() {
		mapa.modificar(aPosicao(0, 2), PERSONAGEM);
		verify(saida).elementoAlterado(aPosicao(0, 1), VAZIO);
		verify(saida).elementoAlterado(aPosicao(0, 2), PERSONAGEM);
		verifyNoMoreInteractions(saida);
		assertThat(mapa.getElemento(aPosicao(0, 1)), is(VAZIO));
		assertThat(mapa.getElemento(aPosicao(0, 2)), is(PERSONAGEM));
	}

}
