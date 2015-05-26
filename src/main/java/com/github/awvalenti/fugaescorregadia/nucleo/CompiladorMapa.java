package com.github.awvalenti.fugaescorregadia.nucleo;

import java.util.Arrays;

import javax.inject.Inject;

public class CompiladorMapa {

	private final ElementoFactory fabricaElementos;

	@Inject
	public CompiladorMapa(ElementoFactory fabricaElementos) {
		this.fabricaElementos = fabricaElementos;
	}

	public Mapa compilar(String mapaEmString) {
		return new MapaImutavel(Arrays
				.stream(mapaEmString.replaceAll(" ", "").split("\n"))
				.map(linha -> linha
						.chars()
						.mapToObj(
								caractereInt -> fabricaElementos
										.comCaractere((char) caractereInt))
						.toArray(tamanho -> new Elemento[tamanho]))
				.toArray(tamanho -> new Elemento[tamanho][]));
	}

}
