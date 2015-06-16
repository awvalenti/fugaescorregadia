package com.github.awvalenti.fugaescorregadia.componentes;

import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Mapa;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaImutavel;

public class CompiladorMapa {

	public Mapa compilar(Reader leitor) throws IOException {
		List<List<Elemento>> matriz = new ArrayList<>();

		List<Elemento> linha = new ArrayList<>();

		int valorLido;
		while ((valorLido = leitor.read()) != -1) {
			char caractere = (char) valorLido;

			switch (caractere) {
			case ' ':
				break;
			case '\n':
				matriz.add(linha);
				linha = new ArrayList<>();
				break;
			default:
				linha.add(Elemento.comCaractere(caractere));
				break;
			}
		}

		return new MapaImutavel(matriz);
	}

}
