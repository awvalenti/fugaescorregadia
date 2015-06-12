package com.github.awvalenti.fugaescorregadia.interfacegrafica.modoeditor;

import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.FabricaIcones;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.PainelTabuleiro;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Tabuleiro;
import com.github.awvalenti.fugaescorregadia.nucleo.modoeditor.SaidaModoEditor;

public class PainelTabuleiroModoEditor extends PainelTabuleiro implements SaidaModoEditor {

	private static final long serialVersionUID = 1L;

	public PainelTabuleiroModoEditor(int atrasoAtualizacaoTela,
			int numeroLinhas, int numeroColunas, FabricaIcones fabricaIcones) {
		super(atrasoAtualizacaoTela, numeroLinhas, numeroColunas, fabricaIcones);
	}

	@Override
	public void inicioEdicao(Tabuleiro tabuleiro) {
		preencher(tabuleiro);
	}

	@Override
	public void tabuleiroAlterado(Posicao p, Elemento novo) {
		alterarElemento(p, novo);
	}

}
