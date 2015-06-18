package com.github.awvalenti.fugaescorregadia.interfacegrafica.modoeditor;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao.*;

import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.FabricaIcones;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.PainelTabuleiro;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;
import com.github.awvalenti.fugaescorregadia.nucleo.modoeditor.SaidaModoEditor;

public class PainelTabuleiroModoEditor extends PainelTabuleiro implements SaidaModoEditor, ConversorDeXYParaPosicao {

	private static final long serialVersionUID = 1L;

	public PainelTabuleiroModoEditor(int atrasoAtualizacaoTela,
			int numeroLinhas, int numeroColunas, FabricaIcones fabricaIcones) {
		super(atrasoAtualizacaoTela, numeroLinhas, numeroColunas, fabricaIcones);
	}

	@Override
	public void novoMapaCarregado(MapaLeitura mapa) {
		preencher(mapa);
	}

	@Override
	public void tabuleiroAlterado(Posicao p, Elemento novo) {
		alterarElemento(p, novo);
	}

	@Override
	public Posicao converterParaPosicao(int x, int y) {
		return aPosicao(y / fabricaIcones.tamanhoIcone(), x / fabricaIcones.tamanhoIcone());
	}

}
