package com.github.awvalenti.fugaescorregadia;

import java.util.Arrays;
import java.util.Optional;

public class FuncionalJava8 implements OperacoesFuncionais {

	@Override
	public Mapa deLinhasStringMapaParaMapa(String[] linhasStringMapa,
			ElementoFactory fabricaElementos) {
		return new Mapa(Arrays
				.stream(linhasStringMapa)
				.map(linha -> linha
						.chars()
						.mapToObj(caractereInt ->
								fabricaElementos.comCaractere((char) caractereInt))
						.toArray(tamanho -> new Elemento[tamanho]))
				.toArray(tamanho -> new Elemento[tamanho][]));
	}

	@Override
	public Elemento deCaractereParaElemento(char caractere) {
		Optional<Elemento> elemento = Arrays.stream(Elemento.values())
				.filter(e -> e.getCaractere() == caractere).findFirst();

		elemento.orElseThrow(() -> new IllegalArgumentException(
				String.format("Caractere invalido. Codigo: %d. Valor: %c.", (int) caractere, caractere)));

		return elemento.get();
	}

}
