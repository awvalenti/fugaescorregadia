package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.InjetorParaTestes.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.Posicao.*;
import static org.mockito.Mockito.*;

import org.junit.Before;
import org.junit.Test;

public class TentativaTest {

	private Tentativa tentativa;
	private SaidaJogo saida;

	@Before
	public void setUp() {
		CompiladorMapa compilador = criarInjetorParaTestes().getInstance(CompiladorMapa.class);
		Mapa mapa = compilador.compilar(""
				+ "p _ _ _ o\n"
				+ "_ _ _ _ _\n"
				+ "_ _ _ _ _\n"
				+ "_ _ _ _ _\n"
				+ "o _ _ _ _\n"
				+ "");
		saida = mock(SaidaJogo.class);
		tentativa = new Tentativa(mapa, saida);
	}

	@Test
	public void deve_movimentar_personagem_ate_uma_casa_antes_de_obstaculo() {
		tentativa.efetuarMovimento(Direcao.DIREITA);
		verify(saida).movimento(aPosicao(0, 3));
		tentativa.efetuarMovimento(Direcao.BAIXO);
		verify(saida).movimento(aPosicao(3, 0));
	}

}
