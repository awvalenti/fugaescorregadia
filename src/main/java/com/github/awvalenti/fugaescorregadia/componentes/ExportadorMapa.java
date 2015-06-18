package com.github.awvalenti.fugaescorregadia.componentes;

import java.io.IOException;
import java.io.Writer;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.IteradorMapa;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;

public class ExportadorMapa {

	public void exportar(Writer escritor, MapaLeitura mapa) throws IOException {
		for (IteradorMapa it = mapa.iterador(); it.temProximo(); it.avancar()) {
			if (it.iniciouNovaLinha()) escritor.append('\n');
			escritor.append(it.elementoAtual().getCaractere()).append(' ');
		}
	}

}
