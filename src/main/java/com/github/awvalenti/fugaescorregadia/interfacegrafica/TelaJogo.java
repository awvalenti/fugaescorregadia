package com.github.awvalenti.fugaescorregadia.interfacegrafica;

import javax.swing.JFrame;

public class TelaJogo {

	private final JFrame frame;

	public TelaJogo(TabuleiroPanel tabuleiroPanel, TecladoListener tecladoListener) {
		frame = new JFrame();
		frame.add(tabuleiroPanel);
		frame.addKeyListener(tecladoListener);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}

	public void exibir() {
		frame.pack();
		frame.setLocationRelativeTo(null);
		frame.setExtendedState(JFrame.MAXIMIZED_BOTH);
		frame.setVisible(true);
	}

}
