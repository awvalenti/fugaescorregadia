package com.github.awvalenti.fugaescorregadia.nucleo;

import static com.github.awvalenti.fugaescorregadia.nucleo.Direcao.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.Posicao.*;

import org.junit.Test;

public class TentativaSetasTest extends TentativaTest {

	@Override
	protected String obterMapaEmString() {
		return ""
				+ "- - - - - - -\n"
				+ "- - - - - - -\n"
				+ "- - - ^ - - -\n"
				+ "- - < p > - -\n"
				+ "- - - v - - -\n"
				+ "- - - - - - -\n"
				+ "- - - - - - -\n"
				+ "";
	}

	@Test
	public void seta_cima_deve_permitir_movimento_somente_na_direcao_apontada() {
		tentativa.efetuarMovimento(CIMA);
		tentativa.efetuarMovimento(BAIXO);
		verificarPassagemPor(aPosicao(3, 3), aPosicao(2, 3), aPosicao(1, 3), aPosicao(0, 3), aPosicao(1, 3));
	}

	@Test
	public void seta_baixo_deve_permitir_movimento_somente_na_direcao_apontada() {
		tentativa.efetuarMovimento(BAIXO);
		verificarPassagemPor(aPosicao(3, 3), aPosicao(4, 3), aPosicao(5, 3), aPosicao(6, 3));
	}

	@Test
	public void seta_esquerda_deve_permitir_movimento_somente_na_direcao_apontada() {
		tentativa.efetuarMovimento(ESQUERDA);
		verificarPassagemPor(aPosicao(3, 3), aPosicao(3, 2), aPosicao(3, 1), aPosicao(3, 0));
	}

	@Test
	public void seta_direita_deve_permitir_movimento_somente_na_direcao_apontada() {
		tentativa.efetuarMovimento(DIREITA);
		verificarPassagemPor(aPosicao(3, 3), aPosicao(3, 4), aPosicao(3, 5), aPosicao(3, 6));
	}

}
