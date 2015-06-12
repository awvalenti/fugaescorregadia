package com.github.awvalenti.fugaescorregadia.nucleo.modohistoria;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Mapa;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;

public interface SaidaModoHistoria {

	void inicioTentativa(Mapa mapa);

	void movimento(Posicao origem, Elemento elementoNaOrigem, Posicao destino);

}
