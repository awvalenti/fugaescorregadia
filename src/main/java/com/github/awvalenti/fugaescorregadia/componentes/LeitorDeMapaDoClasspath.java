package com.github.awvalenti.fugaescorregadia.componentes;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import com.github.awvalenti.fugaescorregadia.nucleo.Mapa;
import com.github.awvalenti.fugaescorregadia.nucleo.MapaImutavel;

public class LeitorDeMapaDoClasspath {

	public Mapa ler(String caminhoRecurso) {
		try {
			return new MapaImutavel(lerRecursoComoString(caminhoRecurso));
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
