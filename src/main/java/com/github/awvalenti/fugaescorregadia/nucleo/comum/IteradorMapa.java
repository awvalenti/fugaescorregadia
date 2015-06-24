package com.github.awvalenti.fugaescorregadia.nucleo.comum;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao.*;

public class IteradorMapa {
	private final MapaLeitura mapa;
	private Posicao posicaoAtual = aPosicao(0, 0);

	public IteradorMapa(MapaLeitura mapa) {
		this.mapa = mapa;
	}

	public boolean iniciouNovaLinha() {
		return posicaoAtual.getColuna() == 0 && posicaoAtual.getLinha() > 0;
	}

	public boolean temProximo() {
		return mapa.posicaoValida(posicaoAtual);
	}

	public Posicao posicaoAtual() {
		return posicaoAtual;
	}

	public Elemento elementoAtual() {
		return mapa.getElemento(posicaoAtual);
	}

	public void avancar() {
		int novaLinha = posicaoAtual.getLinha();
		int novaColuna = posicaoAtual.getColuna();

		if (++novaColuna >= mapa.getNumeroColunas()) {
			novaColuna = 0;
			++novaLinha;
		}

		posicaoAtual = aPosicao(novaLinha, novaColuna);
	}
}