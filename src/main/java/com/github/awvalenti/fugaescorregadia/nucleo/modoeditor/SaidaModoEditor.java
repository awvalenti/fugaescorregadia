package com.github.awvalenti.fugaescorregadia.nucleo.modoeditor;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;

public interface SaidaModoEditor {

	void inicioEdicao(MapaLeitura mapa);

	void tabuleiroAlterado(Posicao p, Elemento novo);

}
