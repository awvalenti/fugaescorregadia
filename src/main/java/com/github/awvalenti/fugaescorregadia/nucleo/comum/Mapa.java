package com.github.awvalenti.fugaescorregadia.nucleo.comum;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public abstract class Mapa {

	protected final int numeroLinhas;
	protected final int numeroColunas;
	protected final Map<Posicao, Elemento> elementos;

	protected Mapa(String mapaEmString) {
		Elemento[][] matriz = compilar(mapaEmString);

		numeroLinhas = matriz.length;
		numeroColunas = matriz[0].length;
		elementos = new HashMap<>();

		for (int linha = 0; linha < numeroLinhas; ++linha) {
			for (int coluna = 0; coluna < numeroColunas; ++coluna) {
				elementos.put(aPosicao(linha, coluna), matriz[linha][coluna]);
			}
		}
	}

	protected Mapa(Mapa outro) {
		numeroLinhas = outro.numeroLinhas;
		numeroColunas = outro.numeroColunas;
		elementos = new HashMap<>(outro.elementos);
	}

	public final int getNumeroLinhas() {
		return numeroLinhas;
	}

	public final int getNumeroColunas() {
		return numeroColunas;
	}

	public final Elemento getElemento(Posicao p) {
		return Optional.ofNullable(elementos.get(p)).orElse(OBSTACULO);
	}

	@Override
	public boolean equals(Object o) {
		if (!(o instanceof Mapa)) return false;
		Mapa outro = (Mapa) o;
		return numeroLinhas == outro.numeroLinhas
				&& numeroColunas == outro.numeroColunas
				&& elementos.equals(outro.elementos);
	}

	@Override
	public int hashCode() {
		return elementos.hashCode();
	}

	private static Elemento[][] compilar(String mapaEmString) {
		return Arrays
				.stream(mapaEmString.replaceAll(" ", "").split("\n"))
				.map(linha -> linha
						.chars()
						.mapToObj(
								caractereInt -> Elemento
										.comCaractere((char) caractereInt))
						.toArray(tamanho -> new Elemento[tamanho]))
				.toArray(tamanho -> new Elemento[tamanho][]);
	}

}