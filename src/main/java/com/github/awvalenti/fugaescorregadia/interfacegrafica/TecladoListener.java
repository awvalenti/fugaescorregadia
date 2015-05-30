package com.github.awvalenti.fugaescorregadia.interfacegrafica;

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import com.github.awvalenti.fugaescorregadia.nucleo.Controlavel;
import com.github.awvalenti.fugaescorregadia.nucleo.Direcao;

public class TecladoListener implements KeyListener {

	private final Controlavel controlavel;

	public TecladoListener(Controlavel controlavel) {
		this.controlavel = controlavel;
	}

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
