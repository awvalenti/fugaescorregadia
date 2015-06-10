package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.nucleo.Direcao.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.Posicao.*;
import static org.mockito.Mockito.*;

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
	public void ao_ser_iniciada_deve_avisar_saida_jogo() {
		tentativa.iniciar();
		verify(saida).inicioTentativa(mapa);
	}

	@Test
	public void obstaculo_deve_bloquear_movimento() {
		tentativa.efetuarMovimento(DIREITA);
		verificarPassagemPor(aPosicao(1, 1), aPosicao(1, 2), aPosicao(1, 3));
	}

	@Test
	public void borda_deve_bloquear_movimento() {
		tentativa.efetuarMovimento(ESQUERDA);
		verificarPassagemPor(aPosicao(1, 1), aPosicao(1, 0));
	}

	@Test
	public void segundo_movimento_deve_partir_de_onde_terminou_o_primeiro() {
		tentativa.efetuarMovimento(CIMA);
		tentativa.efetuarMovimento(BAIXO);
		verificarPassagemPor(aPosicao(1, 1), aPosicao(0, 1), aPosicao(1, 1), aPosicao(2, 1));
	}

}
