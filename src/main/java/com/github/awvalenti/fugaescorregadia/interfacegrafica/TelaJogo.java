package com.github.awvalenti.fugaescorregadia.interfacegrafica;

import static com.github.awvalenti.fugaescorregadia.nucleo.Elemento.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.Posicao.*;

import java.awt.GridLayout;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.JFrame;
import javax.swing.JLabel;

import com.github.awvalenti.fugaescorregadia.nucleo.Controlavel;
import com.github.awvalenti.fugaescorregadia.nucleo.Direcao;
import com.github.awvalenti.fugaescorregadia.nucleo.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.Mapa;
import com.github.awvalenti.fugaescorregadia.nucleo.Posicao;
import com.github.awvalenti.fugaescorregadia.nucleo.SaidaJogo;

public class TelaJogo implements SaidaJogo {

	private Mapa mapa;
	private final JFrame frame;
	private Controlavel controlavel;

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

	public void setControlavel(Controlavel controlavel) {
		this.controlavel = controlavel;
	}

	public void exibir() {
		frame.setVisible(true);
	}

	private void preencherTela() {
		for (int i = 0; i < mapa.getNumeroLinhas(); i++) {
			for (int j = 0; j < mapa.getNumeroColunas(); j++) {
				JLabel label = new JLabel(String.valueOf(mapa
						.getElemento(aPosicao(i, j)).getCaractere()));
				label.setHorizontalAlignment(JLabel.CENTER);
				frame.add(label);
			}
		}
	}

	private void alterarElemento(Posicao posicao, Elemento elemento) {
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
			Direcao.doCodigoTecla(e.getKeyCode()).ifPresent(
					d -> controlavel.efetuarMovimento(d));
		}

		@Override
		public void keyReleased(KeyEvent e) {
		}

	}

	@Override
	public void movimento(Posicao origem, Posicao destino) {
		alterarElemento(origem, VAZIO);
		alterarElemento(destino, PERSONAGEM);
	}

}
