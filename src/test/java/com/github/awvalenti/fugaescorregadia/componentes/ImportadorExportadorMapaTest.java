package com.github.awvalenti.fugaescorregadia.componentes;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;

import org.junit.Before;

import com.github.awvalenti.fugaescorregadia.TesteBase;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeituraEscrita;

public abstract class ImportadorExportadorMapaTest extends TesteBase {

	protected MapaLeitura mapaTeste;
	protected ImportadorExportadorMapa impExp;

	@Before
	public void setUp() {
		impExp = obterInstancia(ImportadorExportadorMapa.class);
		mapaTeste = new MapaLeituraEscrita(new Elemento[][] {
			{ VAZIO, PARTIDA, VAZIO },
			{ OBSTACULO, VAZIO, VAZIO },
		});
	}

}
