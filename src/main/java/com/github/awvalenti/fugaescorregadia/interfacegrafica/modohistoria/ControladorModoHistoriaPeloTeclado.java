package com.github.awvalenti.fugaescorregadia.interfacegrafica.modohistoria;

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Direcao;
import com.github.awvalenti.fugaescorregadia.nucleo.modohistoria.ControlavelModoHistoria;

public class ControladorModoHistoriaPeloTeclado implements KeyListener {

	private final ControlavelModoHistoria controlavel;

	public ControladorModoHistoriaPeloTeclado(ControlavelModoHistoria controlavel) {
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
