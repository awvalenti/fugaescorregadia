package com.github.awvalenti.fugaescorregadia.componentes;

import java.util.Arrays;
import java.util.Optional;

import com.github.awvalenti.fugaescorregadia.nucleo.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.ElementoFactory;
import com.github.awvalenti.fugaescorregadia.nucleo.Mapa;
import com.github.awvalenti.fugaescorregadia.nucleo.OperacoesFuncionais;

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
