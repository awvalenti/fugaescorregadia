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
		verificar(DIREITA, aPosicao(1, 1), aPosicao(1, 2), aPosicao(1, 3));
		verificar(BAIXO, aPosicao(1, 1), aPosicao(2, 1));
	}

	@Test
	public void deve_parar_movimento_antes_das_bordas() {
		verificar(ESQUERDA, aPosicao(1, 1), aPosicao(1, 0));
		verificar(CIMA, aPosicao(1, 1), aPosicao(0, 1));
	}

	@Test
	public void deve_atualizar_posicao_do_personagem() {
		InOrder inOrder = inOrder(saida);
		criarTentativa();

		tentativa.efetuarMovimento(CIMA);
		inOrder.verify(saida, times(1)).movimento(aPosicao(1, 1), aPosicao(0, 1));

		tentativa.efetuarMovimento(BAIXO);
		inOrder.verify(saida, times(1)).movimento(aPosicao(0, 1), aPosicao(1, 1));
		inOrder.verify(saida, times(1)).movimento(aPosicao(1, 1), aPosicao(2, 1));

		inOrder.verifyNoMoreInteractions();
	}

	private void verificar(Direcao d, Posicao... caminho) {
		criarTentativa();
		tentativa.efetuarMovimento(d);
		InOrder inOrder = inOrder(saida);
		for (int i = 1; i < caminho.length; ++i) {
			inOrder.verify(saida, times(1)).movimento(caminho[i - 1], caminho[i]);
		}
		inOrder.verifyNoMoreInteractions();
	}

	private void criarTentativa() {
		tentativa = new Tentativa(mapa, saida);
	}

}
