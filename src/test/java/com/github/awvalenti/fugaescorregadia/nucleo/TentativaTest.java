package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.InjetorParaTestes.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.Posicao.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.Direcao.*;
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
		verificarCaminho(DIREITA, aPosicao(0, 1), aPosicao(0, 2), aPosicao(0, 3));
		verificarCaminho(BAIXO, aPosicao(1, 0), aPosicao(2, 0));
	}

	private void verificarCaminho(Direcao d, Posicao... caminho) {
		tentativa = new Tentativa(mapa, saida);
		tentativa.efetuarMovimento(d);
		InOrder inOrder = inOrder(saida);
		for (Posicao passo : caminho) {
			inOrder.verify(saida, times(1)).movimento(passo);
		}
		inOrder.verifyNoMoreInteractions();
	}

}
