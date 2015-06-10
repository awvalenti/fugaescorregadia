package com.github.awvalenti.fugaescorregadia.interfacegrafica;

import java.awt.Point;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;

import javax.swing.JFrame;

public class JanelaJogo {

	private final JFrame frame;

	public JanelaJogo(PainelTabuleiro tabuleiroPanel, TecladoListener tecladoListener) {
		frame = new JFrame("Fuga Escorregadia");
		frame.add(tabuleiroPanel);
		frame.addKeyListener(tecladoListener);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}

	public void exibir() {
		colocarEmTelaCheia();
		esconderCursor();
		frame.setVisible(true);
	}

	private void colocarEmTelaCheia() {
		frame.setUndecorated(true);
		frame.setExtendedState(JFrame.MAXIMIZED_BOTH);
	}

	private void esconderCursor() {
		frame.setCursor(Toolkit.getDefaultToolkit().createCustomCursor(
				new BufferedImage(16, 16, BufferedImage.TYPE_INT_ARGB), new Point(0, 0), ""));
	}

}
