package com.github.awvalenti.fugaescorregadia.nucleo;

import static org.mockito.Mockito.*;

import org.junit.Before;
import org.mockito.InOrder;

import com.github.awvalenti.fugaescorregadia.TesteBase;

public abstract class TentativaTest extends TesteBase {

	protected Tentativa tentativa;
	protected SaidaJogo saida;
	protected Mapa mapa;

	@Before
	public final void setUp() {
		mapa = new MapaImutavel(obterMapaEmString());
		saida = mock(SaidaJogo.class);
		tentativa = new Tentativa(mapa, saida);
	}

	protected abstract String obterMapaEmString();

	protected final void verificarPassagemPor(Posicao... caminho) {
		InOrder inOrder = inOrder(saida);
		for (int i = 1; i < caminho.length; ++i) {
			inOrder.verify(saida).movimento(caminho[i - 1], any(), caminho[i]);
		}
		verifyNoMoreInteractions(saida);
	}

}