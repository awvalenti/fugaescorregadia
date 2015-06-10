package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.nucleo.Direcao.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.Posicao.*;
import static org.mockito.Mockito.*;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InOrder;

import com.github.awvalenti.fugaescorregadia.TesteBase;

public class TentativaTest extends TesteBase {

	private Tentativa tentativa;
	private SaidaJogo saida;
	private Mapa mapa;

	@Before
	public void setUp() {
		mapa = new MapaImutavel(""
				+ "- - - - o\n"
				+ "- p - - o\n"
				+ "- - - - -\n"
				+ "o o - - -\n"
				+ "");
		saida = mock(SaidaJogo.class);
		tentativa = new Tentativa(mapa, saida);
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

	private void verificarPassagemPor(Posicao... caminho) {
		InOrder inOrder = inOrder(saida);
		for (int i = 1; i < caminho.length; ++i) {
			inOrder.verify(saida).movimento(caminho[i - 1], caminho[i]);
		}
		verifyNoMoreInteractions(saida);
	}

}
