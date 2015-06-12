package com.github.awvalenti.fugaescorregadia.nucleo.modoeditor;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Tabuleiro;

public class EditorDeFase implements ControlavelModoEditor {

	private final Tabuleiro tabuleiro;
	private final SaidaModoEditor saida;

	public EditorDeFase(Tabuleiro tabuleiro, SaidaModoEditor saida) {
		this.tabuleiro = tabuleiro;
		this.saida = saida;
	}

	public void iniciar() {
		saida.inicioEdicao(tabuleiro);
	}

	@Override
	public void alterarElemento(Posicao p, Elemento novo) {
		tabuleiro.setElemento(p, novo);
		saida.tabuleiroAlterado(p, novo);
	}

	@Override
	public void salvarFase(String caminho) {
	}

	@Override
	public void carregarFase(String caminho) {
	}

}
