package com.github.awvalenti.fugaescorregadia.nucleo.modoeditor;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;

import com.github.awvalenti.fugaescorregadia.componentes.LeitorDeMapa;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Tabuleiro;
import com.google.common.io.Files;

public class EditorDeFase implements ControlavelModoEditor {

	// FIXME Usar um mapa mutavel no lugar de tabuleiro
	private Tabuleiro tabuleiro;
	private final SaidaModoEditor saida;
	private final LeitorDeMapa leitorDeMapa;

	public EditorDeFase(Tabuleiro tabuleiro, SaidaModoEditor saida,
			LeitorDeMapa leitorDeMapa) {
		this.tabuleiro = tabuleiro;
		this.saida = saida;
		this.leitorDeMapa = leitorDeMapa;
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
		// TODO Revisar
		tabuleiro = new Tabuleiro(leitorDeMapa.lerDeArquivo(arquivo));
		iniciar();
	}

}
