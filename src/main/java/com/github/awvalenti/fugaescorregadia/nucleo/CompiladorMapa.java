package com.github.awvalenti.fugaescorregadia.nucleo;

import javax.inject.Inject;

public class CompiladorMapa {

	private final OperacoesFuncionais funcional;
	private final ElementoFactory fabricaElementos;

	@Inject
	public CompiladorMapa(OperacoesFuncionais funcional,
			ElementoFactory fabricaElementos) {
		this.funcional = funcional;
		this.fabricaElementos = fabricaElementos;
	}

	public Mapa compilar(String mapaEmString) {
		String semEspacos = mapaEmString.replaceAll(" ", "");
		String[] linhas = semEspacos.split("\n");
		return funcional
				.deLinhasStringMapaParaMapa(linhas, fabricaElementos);
	}

}
