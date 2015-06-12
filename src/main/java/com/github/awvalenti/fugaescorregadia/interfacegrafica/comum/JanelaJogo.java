package com.github.awvalenti.fugaescorregadia.interfacegrafica.comum;

import java.awt.Point;
import java.awt.Toolkit;
import java.awt.event.KeyListener;
import java.awt.image.BufferedImage;

import javax.swing.JFrame;

public class JanelaJogo {

	private final JFrame frame;

	public JanelaJogo(PainelTabuleiro tabuleiroPanel, KeyListener controlador) {
		frame = new JFrame("Fuga Escorregadia");
		frame.add(tabuleiroPanel);
		frame.addKeyListener(controlador);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setCursor(Toolkit.getDefaultToolkit().createCustomCursor(
				new BufferedImage(16, 16, BufferedImage.TYPE_INT_ARGB), new Point(0, 0), ""));
	}

	public void exibirEmJanela() {
		frame.setResizable(false);
		frame.pack();
		frame.setLocationRelativeTo(null);
		frame.setVisible(true);
	}

	public void exibirEmTelaCheia() {
		frame.setUndecorated(true);
		frame.setExtendedState(JFrame.MAXIMIZED_BOTH);
		frame.setVisible(true);
	}

}
