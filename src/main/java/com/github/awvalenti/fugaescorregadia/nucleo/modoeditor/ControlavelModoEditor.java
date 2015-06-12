package com.github.awvalenti.fugaescorregadia.nucleo.modoeditor;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;

public interface ControlavelModoEditor {

	void alterarElemento(Posicao p, Elemento novo);

	void salvarFase(String caminho);

	void carregarFase(String caminho);

}
