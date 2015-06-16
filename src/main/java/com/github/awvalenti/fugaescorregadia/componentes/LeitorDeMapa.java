package com.github.awvalenti.fugaescorregadia.componentes;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Scanner;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Mapa;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaImutavel;

public class LeitorDeMapa {

	public Mapa lerDoClasspath(String caminhoRecurso) {
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

	public Mapa lerDeArquivo(File arquivo) {
		try {
			return new MapaImutavel(lerArquivoComoString(arquivo));
		} catch (FileNotFoundException e) {
			throw new RuntimeException(e);
		}
	}

	private String lerArquivoComoString(File arquivo) throws FileNotFoundException {
		try (Scanner scanner = new Scanner(arquivo)) {
			StringBuilder sb = new StringBuilder();
			while (scanner.hasNextLine()) {
				sb.append(scanner.nextLine()).append('\n');
			}

			return sb.toString();
		}
	}

}
