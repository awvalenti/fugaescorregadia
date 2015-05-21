package com.github.awvalenti.fugaescorregadia.interfacegrafica;

import java.awt.GridLayout;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.JFrame;
import javax.swing.JLabel;

import com.github.awvalenti.fugaescorregadia.nucleo.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.Mapa;
import com.github.awvalenti.fugaescorregadia.nucleo.Posicao;

public class TelaJogo {

	private Mapa mapa;
	private JFrame frame;

	public TelaJogo(Mapa mapa) {
		this.mapa = mapa;

		frame = new JFrame();
		frame.setLayout(new GridLayout(mapa.getNumeroLinhas(), mapa
				.getNumeroColunas()));
		frame.addKeyListener(new TecladoListener());

		preencherTela();

		frame.pack();
		frame.setLocationRelativeTo(null);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}

	private void preencherTela() {
		for (int i = 0; i < mapa.getNumeroLinhas(); i++) {
			for (int j = 0; j < mapa.getNumeroColunas(); j++) {
				JLabel label = new JLabel(String.valueOf(mapa
						.getElemento(posicoes.obter(i, j)).getCaractere()));
				label.setHorizontalAlignment(JLabel.CENTER);
				frame.add(label);
			}
		}
	}

	public void exibir() {
		frame.setVisible(true);
	}

	public void alterarElemento(Posicao posicao, Elemento elemento) {
		int indice = mapa.indiceLinearDe(posicao);
		((JLabel) frame.getContentPane().getComponent(indice))
				.setText(String.valueOf(elemento.getCaractere()));
	}

	private class TecladoListener implements KeyListener {

		@Override
		public void keyTyped(KeyEvent e) {
		}

		@Override
		public void keyPressed(KeyEvent e) {
		}

		@Override
		public void keyReleased(KeyEvent e) {
		}

	}

}
