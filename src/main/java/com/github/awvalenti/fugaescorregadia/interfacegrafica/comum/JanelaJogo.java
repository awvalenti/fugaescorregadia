package com.github.awvalenti.fugaescorregadia.interfacegrafica.comum;

import javax.swing.JFrame;

public class JanelaJogo extends JFrame {

	private static final long serialVersionUID = 1L;

	public JanelaJogo(PainelTabuleiro painelTabuleiro) {
		super("Fuga Escorregadia");
		add(painelTabuleiro);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
	}

	public void exibirEmJanela() {
		setResizable(false);
		pack();
		setLocationRelativeTo(null);
		setVisible(true);
	}

	public void exibirEmTelaCheia() {
		setUndecorated(true);
		setExtendedState(MAXIMIZED_BOTH);
		setVisible(true);
	}

}
