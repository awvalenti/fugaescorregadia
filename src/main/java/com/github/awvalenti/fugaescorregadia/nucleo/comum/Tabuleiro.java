package com.github.awvalenti.fugaescorregadia.nucleo.comum;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao.*;

import java.util.List;

public class Tabuleiro extends Mapa {

	private Posicao posicaoPersonagem;

	public Tabuleiro(Mapa mapa) {
		super(mapa);

		posicaoPersonagem = encontrar(PERSONAGEM);

		setElemento(posicaoPersonagem, VAZIO);
	}

	private Posicao encontrar(Elemento e) {
		for (int i = 0; i < matriz.size(); ++i) {
			for (int j = 0; j < matriz.get(i).size(); ++j) {
				if (matriz.get(i).get(j).equals(e)) return aPosicao(i, j);
			}
		}

		throw new IllegalArgumentException(e + " nao encontrado");
	}

	public void setElemento(Posicao p, Elemento novo) {
		matriz.get(p.getLinha()).set(p.getColuna(), novo);
	}

	public Posicao getPosicaoPersonagem() {
		return posicaoPersonagem;
	}

	public void setPosicaoPersonagem(Posicao posicaoPersonagem) {
		this.posicaoPersonagem = posicaoPersonagem;
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();

		for (List<Elemento> linha : matriz) {
			for (Elemento elemento : linha) {
				sb.append(elemento.getCaractereDoMapaEmString()).append(' ');
			}
			sb.append('\n');
		}

		// FIXME Incluir personagem

		return sb.toString();
	}

}
