package com.github.awvalenti.fugaescorregadia.interfacegrafica.comum;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao.*;

import java.awt.Color;
import java.awt.GridLayout;

import javax.swing.JLabel;
import javax.swing.JPanel;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;

public abstract class PainelTabuleiro extends JPanel {

	private static final long serialVersionUID = 1L;

	protected final int atrasoAtualizacaoTela;
	protected final int numeroLinhas;
	protected final int numeroColunas;
	protected final FabricaIcones fabricaIcones;

	protected PainelTabuleiro(int atrasoAtualizacaoTela, int numeroLinhas,
			int numeroColunas, FabricaIcones fabricaIcones) {
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

	protected final void preencher(MapaLeitura mapa) {
		for (int linha = 0; linha < numeroLinhas; ++linha) {
			for (int coluna = 0; coluna < numeroColunas; ++coluna) {
				Posicao p = aPosicao(linha, coluna);
				alterarElemento(p, mapa.getElemento(p));
			}
		}
	}

	protected final void alterarElemento(Posicao posicao, Elemento elemento) {
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

}