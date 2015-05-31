package com.github.awvalenti.fugaescorregadia.componentes;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import javax.inject.Inject;

import com.github.awvalenti.fugaescorregadia.nucleo.CompiladorMapa;
import com.github.awvalenti.fugaescorregadia.nucleo.Mapa;

public class LeitorDeMapaDoClasspath {

	private final CompiladorMapa compilador;

	@Inject
	public LeitorDeMapaDoClasspath(CompiladorMapa compilador) {
		this.compilador = compilador;
	}

	public Mapa ler(String caminhoRecurso) {
		try {
			return compilador.compilar(lerRecursoComoString(caminhoRecurso));
		} catch (IOException | URISyntaxException e) {
			throw new RuntimeException(e);
		}
	}

	private String lerRecursoComoString(String caminhoRecurso) throws IOException,
			URISyntaxException {
		List<String> linhas = Files.readAllLines(
				Paths.get(getClass().getResource(caminhoRecurso).toURI()),
				Charset.forName("US-ASCII"));

		StringBuilder sb = new StringBuilder();
		for (String linha : linhas) {
			sb.append(linha).append('\n');
		}

		return sb.toString();
	}

}
