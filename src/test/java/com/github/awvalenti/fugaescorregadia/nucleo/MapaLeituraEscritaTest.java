package com.github.awvalenti.fugaescorregadia.nucleo;

import static org.mockito.Mockito.*;

import org.junit.Before;

import com.github.awvalenti.fugaescorregadia.TesteBase;
import com.github.awvalenti.fugaescorregadia.componentes.ImportadorExportadorMapa;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeituraEscrita;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.SaidaMapa;

public abstract class MapaLeituraEscritaTest extends TesteBase {

	protected MapaLeituraEscrita mapa;
	protected ImportadorExportadorMapa impExp;
	protected SaidaMapa saida;

	@Before
	public final void setUp() {
		impExp = obterInstancia(ImportadorExportadorMapa.class);
		mapa = impExp.lerDeString(""
				+ "- p - -\n"
				+ "o o - -\n"
				+ "- < - -\n"
				+ "- v v -\n"
				+ "- - - c\n"
				+ "");
		saida = mock(SaidaMapa.class);
		mapa.setSaida(saida);
	}

}