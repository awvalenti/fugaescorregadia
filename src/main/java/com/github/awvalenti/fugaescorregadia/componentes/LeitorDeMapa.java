package com.github.awvalenti.fugaescorregadia.componentes;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

import javax.inject.Inject;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Mapa;

public class LeitorDeMapa {

	private final CompiladorMapa compilador;

	@Inject
	public LeitorDeMapa(CompiladorMapa compilador) {
		this.compilador = compilador;
	}

	public Mapa lerDeString(String mapaEmString) {
		try (Scanner s = new Scanner(mapaEmString)) {
			return compilador.compilar(s);
		}
	}

	public Mapa lerDoClasspath(String caminhoRecurso) {
		try (Scanner s = new Scanner(getClass().getResourceAsStream(caminhoRecurso))) {
			return compilador.compilar(s);
		}
	}

	public Mapa lerDeArquivo(File arquivo) {
		try (Scanner s = new Scanner(arquivo)) {
			return compilador.compilar(s);
		} catch (FileNotFoundException e) {
			throw new RuntimeException(e);
		}
	}

}
