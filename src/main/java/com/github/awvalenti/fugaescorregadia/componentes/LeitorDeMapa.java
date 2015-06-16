package com.github.awvalenti.fugaescorregadia.componentes;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.StringReader;

import javax.inject.Inject;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Mapa;

public class LeitorDeMapa {

	private final CompiladorMapa compilador;

	@Inject
	public LeitorDeMapa(CompiladorMapa compilador) {
		this.compilador = compilador;
	}

	public Mapa lerDeString(String mapaEmString) {
		try (Reader r = new StringReader(mapaEmString)) {
			return compilador.compilar(r);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public Mapa lerDoClasspath(String caminhoRecurso) {
		try (Reader r = new InputStreamReader(getClass().getResourceAsStream(
				caminhoRecurso))) {
			return compilador.compilar(r);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public Mapa lerDeArquivo(File arquivo) {
		try (Reader r = new FileReader(arquivo)) {
			return compilador.compilar(r);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

}
