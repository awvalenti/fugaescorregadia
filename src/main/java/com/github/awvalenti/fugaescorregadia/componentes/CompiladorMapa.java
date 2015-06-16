package com.github.awvalenti.fugaescorregadia.componentes;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Mapa;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaImutavel;

public class CompiladorMapa {

	public Mapa compilar(Scanner leitorPrincipal) {
		List<List<Elemento>> matriz = new ArrayList<>();

		while (leitorPrincipal.hasNextLine()) {
			List<Elemento> linha = new ArrayList<>();

			try (Scanner leitorDeLinha = new Scanner(leitorPrincipal.nextLine())) {
				while (leitorDeLinha.hasNext()) {
					linha.add(Elemento.comCaractere(leitorDeLinha.next().charAt(0)));
				}
			}

			matriz.add(linha);
		}

		return new MapaImutavel(matriz);
	}

}
