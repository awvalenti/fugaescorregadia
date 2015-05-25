package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.InjetorParaTestes.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.Posicao.*;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InOrder;

public class TentativaTest {

	private Tentativa tentativa;
	private SaidaJogo saida;
	private Mapa mapa;

	@Before
	public void setUp() {
		CompiladorMapa compilador = criarInjetorParaTestes().getInstance(CompiladorMapa.class);
		mapa = compilador.compilar(""
				+ "p _ _ _ o\n"
				+ "_ _ _ _ _\n"
				+ "_ _ _ _ _\n"
				+ "o _ _ _ _\n"
				+ "");
		saida = mock(SaidaJogo.class);
	}

	@Test
	public void deve_movimentar_personagem_ate_uma_casa_antes_de_obstaculo() {
		tentativa = new Tentativa(mapa, saida);
		tentativa.efetuarMovimento(Direcao.DIREITA);
		InOrder inOrder = inOrder(saida);
		inOrder.verify(saida, times(1)).movimento(aPosicao(0, 1));
		inOrder.verify(saida, times(1)).movimento(aPosicao(0, 2));
		inOrder.verify(saida, times(1)).movimento(aPosicao(0, 3));
		inOrder.verifyNoMoreInteractions();

		tentativa = new Tentativa(mapa, saida);
		tentativa.efetuarMovimento(Direcao.BAIXO);
		inOrder = inOrder(saida);
		inOrder.verify(saida, times(1)).movimento(aPosicao(1, 0));
		inOrder.verify(saida, times(1)).movimento(aPosicao(2, 0));
		inOrder.verify(saida, times(1)).movimento(aPosicao(3, 0));
		inOrder.verifyNoMoreInteractions();

		fail("Este teste nao deveria passar");
	}

}
