package com.github.awvalenti.fugaescorregadia.nucleo.modohistoria;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;

public interface SaidaTentativa {

	void inicioTentativa(MapaLeitura mapa);

	void movimento(Posicao origem, Elemento elementoNaOrigem, Posicao destino);

	void passagemDeFase();

}
