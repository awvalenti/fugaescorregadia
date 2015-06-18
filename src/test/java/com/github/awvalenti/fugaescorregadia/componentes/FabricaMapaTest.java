package com.github.awvalenti.fugaescorregadia.componentes;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

import java.io.File;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.Test;

import com.github.awvalenti.fugaescorregadia.TesteBase;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeituraEscrita;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;

public class FabricaMapaTest extends TesteBase {

	private FabricaMapa fabricaMapa;
	private MapaLeitura resultadoEsperado;

	@Before
	public void setUp() {
		fabricaMapa = obterInstancia(FabricaMapa.class);
		resultadoEsperado = new MapaLeituraEscrita(new Elemento[][] {
			{ VAZIO, PERSONAGEM, VAZIO },
			{ OBSTACULO, VAZIO, VAZIO },
		});
	}

	@Test
	public void deve_ler_mapa_de_string() {
		String mapaEmString = ""
				+ "- p -\n"
				+ "o - -\n"
				+ "";
		assertThat(fabricaMapa.lerDeString(mapaEmString), is(resultadoEsperado));
	}

	@Test
	public void deve_ler_mapa_do_classpath() {
		assertThat(fabricaMapa.lerDoClasspath("/mapas/teste.mapa"), is(resultadoEsperado));
	}

	@Test
	public void deve_ler_mapa_de_arquivo() throws URISyntaxException {
		File emArquivo = new File(getClass().getResource("/mapas/teste.mapa").toURI());
		assertThat(fabricaMapa.lerDeArquivo(emArquivo), is(resultadoEsperado));
	}

}
