package com.github.awvalenti.fugaescorregadia.interfacegrafica;

import javax.swing.JFrame;

public class TelaJogo {

	private final JFrame frame;

	public TelaJogo(TabuleiroPanel tabuleiroPanel, TecladoListener tecladoListener) {
		frame = new JFrame();

		frame.add(tabuleiroPanel);
		frame.pack();

		frame.addKeyListener(tecladoListener);

		frame.setLocationRelativeTo(null);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}

	public void exibir() {
		frame.setVisible(true);
	}

}