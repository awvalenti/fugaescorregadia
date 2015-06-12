package com.github.awvalenti.fugaescorregadia.nucleo.modoeditor;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Tabuleiro;

public interface SaidaModoEditor {

	void inicioEdicao(Tabuleiro tabuleiro);

	void tabuleiroAlterado(Posicao p, Elemento novo);

}
