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
				+ "_ _ _ _ o\n"
				+ "_ p _ _ o\n"
				+ "_ _ _ _ _\n"
				+ "o o _ _ _\n"
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
	public void indo_para_direita_deve_parar_movimento_antes_de_obstaculo() {
		tentativa.efetuarMovimento(DIREITA);
		verificarPassagemPor(aPosicao(1, 1), aPosicao(1, 2), aPosicao(1, 3));
	}

	@Test
	public void indo_para_baixo_deve_parar_movimento_antes_de_obstaculo() {
		tentativa.efetuarMovimento(BAIXO);
		verificarPassagemPor(aPosicao(1, 1), aPosicao(2, 1));
	}

	@Test
	public void indo_para_esquerda_deve_parar_movimento_antes_das_bordas() {
		tentativa.efetuarMovimento(ESQUERDA);
		verificarPassagemPor(aPosicao(1, 1), aPosicao(1, 0));
	}

	@Test
	public void indo_para_cima_deve_parar_movimento_antes_das_bordas() {
		tentativa.efetuarMovimento(CIMA);
		verificarPassagemPor(aPosicao(1, 1), aPosicao(0, 1));
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
