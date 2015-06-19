package com.github.awvalenti.fugaescorregadia.componentes;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.StringReader;
import java.io.Writer;
import java.nio.charset.Charset;

import javax.inject.Inject;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeituraEscrita;

public class ImportadorExportadorMapa {

	private static final Charset ASCII = Charset.forName("US-ASCII");

	private final ConversorEntreMapaETexto conversor;

	@Inject
	public ImportadorExportadorMapa(ConversorEntreMapaETexto conversor) {
		this.conversor = conversor;
	}

	public MapaLeituraEscrita criarMapaVazio() {
		return lerDoClasspath("/mapas/vazio.mapa");
	}

	public final MapaLeituraEscrita lerDoClasspath(String caminhoRecurso) {
		try (Reader r = new InputStreamReader(getClass().getResourceAsStream(caminhoRecurso), ASCII)) {
			return conversor.deTextoParaMapa(r);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public MapaLeituraEscrita lerDeString(String mapaEmString) {
		try (Reader r = new StringReader(mapaEmString)) {
			return conversor.deTextoParaMapa(r);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public MapaLeituraEscrita lerDeArquivo(File arquivo) {
		try (Reader r = new InputStreamReader(new FileInputStream(arquivo), ASCII)) {
			return conversor.deTextoParaMapa(r);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public void escreverEmArquivo(File arquivo, MapaLeitura mapa) {
		try (Writer w = new OutputStreamWriter(new FileOutputStream(arquivo), ASCII)) {
			conversor.deMapaParaTexto(mapa, w);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

}
