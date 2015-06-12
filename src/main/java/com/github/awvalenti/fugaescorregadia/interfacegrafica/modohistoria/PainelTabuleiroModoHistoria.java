package com.github.awvalenti.fugaescorregadia.interfacegrafica.modohistoria;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;

import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.FabricaIcones;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.PainelTabuleiro;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Mapa;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;
import com.github.awvalenti.fugaescorregadia.nucleo.modohistoria.SaidaModoHistoria;

public class PainelTabuleiroModoHistoria extends PainelTabuleiro implements SaidaModoHistoria {

	private static final long serialVersionUID = 1L;

	public PainelTabuleiroModoHistoria(int atrasoAtualizacaoTela,
			int numeroLinhas, int numeroColunas, FabricaIcones fabricaIcones) {
		super(atrasoAtualizacaoTela, numeroLinhas, numeroColunas, fabricaIcones);
	}

	@Override
	public void inicioTentativa(Mapa mapa) {
		preencher(mapa);
	}

	@Override
	public void movimento(Posicao origem, Elemento elementoNaOrigem, Posicao destino) {
		alterarElemento(origem, elementoNaOrigem);
		alterarElemento(destino, PERSONAGEM);
		int tamanho = fabricaIcones.tamanhoIcone();
		paintImmediately(tamanho * origem.getColuna(), tamanho * origem.getLinha(), tamanho, tamanho);
		paintImmediately(tamanho * destino.getColuna(), tamanho * destino.getLinha(), tamanho, tamanho);
		try {
			Thread.sleep(atrasoAtualizacaoTela);
		} catch (InterruptedException e) {
			throw new RuntimeException(e);
		}
	}

}