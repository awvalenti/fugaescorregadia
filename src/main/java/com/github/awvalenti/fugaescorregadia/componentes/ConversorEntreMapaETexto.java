package com.github.awvalenti.fugaescorregadia.componentes;

import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.IteradorMapa;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeituraEscrita;

public class ConversorEntreMapaETexto {

	public void deMapaParaTexto(MapaLeitura mapa, Writer escritor) throws IOException {
		IteradorMapa it = mapa.iterador();
		do {
			escritor.append(it.elementoAtual().getCaractere()).append(' ');
			it.avancar();
			if (it.iniciouNovaLinha()) escritor.append('\n');
		} while (it.temProximo());
	}

	public MapaLeituraEscrita deTextoParaMapa(Reader leitor) throws IOException {
		List<List<Elemento>> matriz = new ArrayList<>();

		List<Elemento> linha = new ArrayList<>();

		int valorLido;
		while ((valorLido = leitor.read()) != -1) {
			char caractere = (char) valorLido;

			if (caractere == ' ') continue;

			if (caractere == '\n') {
				matriz.add(linha);
				linha = new ArrayList<>();
			} else {
				linha.add(Elemento.comCaractere(caractere));
			}
		}

		return new MapaLeituraEscrita(listDeListParaVetorDeVetor(matriz));
	}

	private Elemento[][] listDeListParaVetorDeVetor(List<List<Elemento>> matriz) {
		return matriz.stream().map(linha -> linha.stream().toArray(Elemento[]::new))
				.toArray(Elemento[][]::new);
	}

}
