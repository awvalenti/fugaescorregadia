package com.github.awvalenti.fugaescorregadia.interfacegrafica;

import static com.github.awvalenti.fugaescorregadia.nucleo.Elemento.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.Posicao.*;

import java.awt.Color;
import java.awt.GridLayout;

import javax.swing.JLabel;
import javax.swing.JPanel;

import com.github.awvalenti.fugaescorregadia.nucleo.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.Mapa;
import com.github.awvalenti.fugaescorregadia.nucleo.Posicao;
import com.github.awvalenti.fugaescorregadia.nucleo.SaidaJogo;

public class PainelTabuleiro extends JPanel implements SaidaJogo {

	private static final long serialVersionUID = 1L;

	private final int atrasoAtualizacaoTela;
	private final int numeroLinhas;
	private final int numeroColunas;
	private final FabricaIcones fabricaIcones;

	public PainelTabuleiro(int atrasoAtualizacaoTela, int numeroLinhas, int numeroColunas,
			FabricaIcones fabricaIcones) {
		this.atrasoAtualizacaoTela = atrasoAtualizacaoTela;
		this.numeroLinhas = numeroLinhas;
		this.numeroColunas = numeroColunas;
		this.fabricaIcones = fabricaIcones;

		setLayout(new GridLayout(numeroLinhas, numeroColunas));

		for (int linha = 0; linha < numeroLinhas; ++linha) {
			for (int coluna = 0; coluna < numeroColunas; ++coluna) {
				add(criarLabelElemento());
			}
		}
	}

	private void alterarElemento(Posicao posicao, Elemento elemento) {
		int indiceLinear = numeroColunas * posicao.getLinha() + posicao.getColuna();
		atualizarLabelElemento(((JLabel) getComponent(indiceLinear)), elemento);
	}

	private JLabel criarLabelElemento() {
		JLabel label = new JLabel();
		label.setOpaque(true);
		label.setBackground(Color.BLACK);
		return label;
	}

	private void atualizarLabelElemento(JLabel label, Elemento elemento) {
		label.setIcon(fabricaIcones.obter(elemento));
	}

	@Override
	public void inicioTentativa(Mapa mapa) {
		for (int linha = 0; linha < numeroLinhas; ++linha) {
			for (int coluna = 0; coluna < numeroColunas; ++coluna) {
				Posicao p = aPosicao(linha, coluna);
				alterarElemento(p, mapa.getElemento(p));
			}
		}
	}

	@Override
	public void movimento(Posicao origem, Elemento elementoNaOrigem, Posicao destino) {
		alterarElemento(origem, elementoNaOrigem);
		alterarElemento(destino, PERSONAGEM);
		int tamanhoIcone = fabricaIcones.tamanhoIcone();
		paintImmediately(tamanhoIcone * origem.getColuna(), tamanhoIcone * origem.getLinha(), tamanhoIcone, tamanhoIcone);
		paintImmediately(tamanhoIcone * destino.getColuna(), tamanhoIcone * destino.getLinha(), tamanhoIcone, tamanhoIcone);
		try {
			Thread.sleep(atrasoAtualizacaoTela);
		} catch (InterruptedException e) {
			throw new RuntimeException(e);
		}
	}

}
