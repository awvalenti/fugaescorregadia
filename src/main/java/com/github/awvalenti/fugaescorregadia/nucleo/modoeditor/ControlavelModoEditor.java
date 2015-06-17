package com.github.awvalenti.fugaescorregadia.nucleo.modoeditor;

import java.io.File;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;

public interface ControlavelModoEditor {

	void alterarElemento(Posicao p, Elemento novo);

	void salvarMapa(File arquivo);

	void carregarMapa(File arquivo);

}
