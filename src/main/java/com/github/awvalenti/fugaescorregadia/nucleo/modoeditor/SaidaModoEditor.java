package com.github.awvalenti.fugaescorregadia.nucleo.modoeditor;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.SaidaMapaEscrita;

public interface SaidaModoEditor extends SaidaMapaEscrita {

	void novoMapaCarregado(MapaLeitura mapa);

}
