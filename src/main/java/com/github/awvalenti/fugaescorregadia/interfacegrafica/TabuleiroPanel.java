package com.github.awvalenti.fugaescorregadia.interfacegrafica;

import static com.github.awvalenti.fugaescorregadia.nucleo.Elemento.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.Posicao.*;

import java.awt.GridLayout;

import javax.swing.JLabel;
import javax.swing.JPanel;

import com.github.awvalenti.fugaescorregadia.nucleo.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.Mapa;
import com.github.awvalenti.fugaescorregadia.nucleo.Posicao;
import com.github.awvalenti.fugaescorregadia.nucleo.SaidaJogo;

public class TabuleiroPanel extends JPanel implements SaidaJogo {

	private static final long serialVersionUID = 1L;

	private final int atrasoAtualizacaoTela;
	private final int numeroLinhas;
	private final int numeroColunas;

	public TabuleiroPanel(int atrasoAtualizacaoTela, int numeroLinhas, int numeroColunas) {
		this.atrasoAtualizacaoTela = atrasoAtualizacaoTela;
		this.numeroLinhas = numeroLinhas;
		this.numeroColunas = numeroColunas;

		setLayout(new GridLayout(numeroLinhas, numeroColunas));

		for (int linha = 0; linha < numeroLinhas; ++linha) {
			for (int coluna = 0; coluna < numeroColunas; ++coluna) {
				JLabel label = new JLabel();
				label.setHorizontalAlignment(JLabel.CENTER);
				add(label);
			}
		}
	}

	private void alterarElemento(Posicao posicao, Elemento elemento) {
		int indiceLinear = numeroColunas * posicao.getLinha() + posicao.getColuna();
		((JLabel) getComponent(indiceLinear)).setText(String.valueOf(elemento.getCaractere()));
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
	public void movimento(Posicao origem, Posicao destino) {
		alterarElemento(origem, VAZIO);
		alterarElemento(destino, PERSONAGEM);
		paintImmediately(getBounds());
		try {
			Thread.sleep(atrasoAtualizacaoTela);
		} catch (InterruptedException e) {
			throw new RuntimeException(e);
		}
	}

}
