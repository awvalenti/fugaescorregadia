package com.github.awvalenti.fugaescorregadia.nucleo;

public interface OperacoesFuncionais {

	Elemento deCaractereParaElemento(char caractere);

	Mapa deLinhasStringMapaParaMapa(String[] linhasStringMapa,
			ElementoFactory fabricaElementos);

}