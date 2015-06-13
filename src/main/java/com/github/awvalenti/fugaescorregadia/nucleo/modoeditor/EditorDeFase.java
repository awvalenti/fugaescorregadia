package com.github.awvalenti.fugaescorregadia.nucleo.modoeditor;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Tabuleiro;
import com.google.common.io.Files;

public class EditorDeFase implements ControlavelModoEditor {

	private final Tabuleiro tabuleiro;
	private final SaidaModoEditor saida;

	public EditorDeFase(Tabuleiro tabuleiro, SaidaModoEditor saida) {
		this.tabuleiro = tabuleiro;
		this.saida = saida;
	}

	public void iniciar() {
		saida.inicioEdicao(tabuleiro);
	}

	@Override
	public void alterarElemento(Posicao posicao, Elemento novo) {
		// TODO Trocar para opcoes de mapa com 1 ou 2 camadas
		if (novo == PERSONAGEM) {
			saida.tabuleiroAlterado(tabuleiro.getPosicaoPersonagem(), VAZIO);
			tabuleiro.setPosicaoPersonagem(posicao);
			saida.tabuleiroAlterado(posicao, PERSONAGEM);
		} else {
			tabuleiro.setElemento(posicao, novo);
			saida.tabuleiroAlterado(posicao, novo);
		}
	}

	@Override
	public void salvarFase(File arquivo) {
		try {
			// TODO Melhorar. Evitar com.google.common.io.Files.
			Files.write(tabuleiro.toString(), arquivo, Charset.forName("US-ASCII"));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public void carregarFase(File arquivo) {
		// TODO
		System.out.println(arquivo);
	}

}
