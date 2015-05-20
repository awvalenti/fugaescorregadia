package com.github.awvalenti.fugaescorregadia;

public interface OperacoesFuncionais {

	Elemento deCaractereParaElemento(char caractere);

	Mapa deLinhasStringMapaParaMapa(String[] linhasStringMapa,
			ElementoFactory fabricaElementos);

}