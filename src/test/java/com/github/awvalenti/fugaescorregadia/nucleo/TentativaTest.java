package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.InjetorParaTestes.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.Direcao.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.Posicao.*;
import static org.mockito.Mockito.*;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InOrder;

public class TentativaTest {

	private Controlavel tentativa;
	private SaidaJogo saida;
	private Mapa mapa;

	@Before
	public void setUp() {
		CompiladorMapa compilador = criarInjetorParaTestes().getInstance(CompiladorMapa.class);
		mapa = compilador.compilar(""
				+ "_ _ _ _ o\n"
				+ "_ p _ _ o\n"
				+ "_ _ _ _ _\n"
				+ "o o _ _ _\n"
				+ "");
		saida = mock(SaidaJogo.class);
	}

	@Test
	public void deve_parar_movimento_antes_de_obstaculo() {
		verificarCaminho(DIREITA, aPosicao(1, 1), aPosicao(1, 2), aPosicao(1, 3));
		verificarCaminho(BAIXO, aPosicao(1, 1), aPosicao(2, 1));
	}

	@Test
	public void deve_parar_movimento_antes_das_bordas() {
		verificarCaminho(ESQUERDA, aPosicao(1, 1), aPosicao(1, 0));
		verificarCaminho(CIMA, aPosicao(1, 1), aPosicao(0, 1));
	}

	private void verificarCaminho(Direcao d, Posicao... caminho) {
		tentativa = new Tentativa(mapa, saida);
		tentativa.efetuarMovimento(d);
		InOrder inOrder = inOrder(saida);
		for (int i = 1; i < caminho.length; ++i) {
			inOrder.verify(saida, times(1)).movimento(caminho[i - 1], caminho[i]);
		}
		inOrder.verifyNoMoreInteractions();
	}

}
