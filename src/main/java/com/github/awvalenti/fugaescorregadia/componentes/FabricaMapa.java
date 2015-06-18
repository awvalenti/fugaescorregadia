package com.github.awvalenti.fugaescorregadia.componentes;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.StringReader;
import java.nio.charset.Charset;

import javax.inject.Inject;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeituraEscrita;

public class FabricaMapa {

	private static final Charset ASCII = Charset.forName("US-ASCII");

	private final ImportadorMapa importador;

	@Inject
	public FabricaMapa(ImportadorMapa importador) {
		this.importador = importador;
	}

	public MapaLeituraEscrita lerDeString(String mapaEmString) {
		try (Reader r = new StringReader(mapaEmString)) {
			return importador.importar(r);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public MapaLeituraEscrita lerDoClasspath(String caminhoRecurso) {
		try (Reader r = new InputStreamReader(getClass().getResourceAsStream(caminhoRecurso), ASCII)) {
			return importador.importar(r);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public MapaLeituraEscrita lerDeArquivo(File arquivo) {
		try (Reader r = new InputStreamReader(new FileInputStream(arquivo), ASCII)) {
			return importador.importar(r);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public MapaLeituraEscrita criarMapaVazio() {
		return lerDoClasspath("/mapas/vazio.mapa");
	}

}
