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

	private final Mapa mapa;

	public TabuleiroPanel(Mapa mapa) {
		this.mapa = mapa;
		setLayout(new GridLayout(mapa.getNumeroLinhas(), mapa.getNumeroColunas()));

		for (int i = 0; i < mapa.getNumeroLinhas(); i++) {
			for (int j = 0; j < mapa.getNumeroColunas(); j++) {
				JLabel label = new JLabel(String.valueOf(mapa.getElemento(
						aPosicao(i, j)).getCaractere()));
				label.setHorizontalAlignment(JLabel.CENTER);
				add(label);
			}
		}
	}

	public void alterarElemento(Posicao posicao, Elemento elemento) {
		int indice = mapa.indiceLinearDe(posicao);
		((JLabel) getComponent(indice)).setText(String.valueOf(elemento.getCaractere()));
	}

	@Override
	public void movimento(Posicao origem, Posicao destino) {
		alterarElemento(origem, VAZIO);
		alterarElemento(destino, PERSONAGEM);
		paintImmediately(getBounds());
		try {
			Thread.sleep(50);
		} catch (InterruptedException e) {
			throw new RuntimeException(e);
		}
	}

}
