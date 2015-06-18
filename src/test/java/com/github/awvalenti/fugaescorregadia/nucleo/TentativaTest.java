package com.github.awvalenti.fugaescorregadia.nucleo;

import static org.mockito.Matchers.*;
import static org.mockito.Mockito.*;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InOrder;

import com.github.awvalenti.fugaescorregadia.TesteBase;
import com.github.awvalenti.fugaescorregadia.componentes.FabricaMapa;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Tentativa;
import com.github.awvalenti.fugaescorregadia.nucleo.modohistoria.SaidaModoHistoria;

public abstract class TentativaTest extends TesteBase {

	protected Tentativa tentativa;
	protected SaidaModoHistoria saida;
	protected MapaLeitura mapa;

	@Before
	public final void setUp() {
		mapa = obterInstancia(FabricaMapa.class).lerDeString(obterMapaEmString());
		saida = mock(SaidaModoHistoria.class);
		tentativa = new Tentativa(mapa, saida);
	}

	@Test
	public final void ao_ser_criada_deve_avisar_saida_jogo() {
		verify(saida).inicioTentativa(mapa);
	}

	protected abstract String obterMapaEmString();

	protected final void verificarPassagemPor(Posicao... caminho) {
		InOrder inOrder = inOrder(saida);

		ao_ser_criada_deve_avisar_saida_jogo();

		for (int i = 1; i < caminho.length; ++i) {
			inOrder.verify(saida).movimento(eq(caminho[i - 1]), any(), eq(caminho[i]));
		}
		verifyNoMoreInteractions(saida);
	}

}