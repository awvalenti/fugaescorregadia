package com.github.awvalenti.fugaescorregadia.nucleo.comum;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;

import java.util.Map.Entry;

public class Tabuleiro extends Mapa {

	private Posicao posicaoPersonagem;

	public Tabuleiro(Mapa mapa) {
		super(mapa);

		posicaoPersonagem = elementos.entrySet().stream()
				.filter(entry -> entry.getValue() == PERSONAGEM)
				.findFirst().get().getKey();

		elementos.put(posicaoPersonagem, VAZIO);
	}

	public void setElemento(Posicao p, Elemento novo) {
		elementos.put(p, novo);
	}

	public Posicao getPosicaoPersonagem() {
		return posicaoPersonagem;
	}

	public void setPosicaoPersonagem(Posicao posicaoPersonagem) {
		this.posicaoPersonagem = posicaoPersonagem;
	}

	@Override
	public String toString() {
		// TODO Melhorar
		StringBuilder sb = new StringBuilder();
		int colunaAtual = 0;
		for (Entry<Posicao, Elemento> entry : elementos.entrySet()) {
			sb.append(
					(posicaoPersonagem.equals(entry.getKey()) ? PERSONAGEM
							: entry.getValue()).getCaractereDoMapaEmString())
					.append(' ');
			if (++colunaAtual >= numeroColunas) {
				sb.append('\n');
				colunaAtual = 0;
			}
		}
		return sb.toString();
	}

}
