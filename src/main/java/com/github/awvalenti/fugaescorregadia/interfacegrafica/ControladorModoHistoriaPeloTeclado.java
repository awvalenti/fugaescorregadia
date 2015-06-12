package com.github.awvalenti.fugaescorregadia.interfacegrafica;

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import com.github.awvalenti.fugaescorregadia.nucleo.ControlavelModoHistoria;
import com.github.awvalenti.fugaescorregadia.nucleo.Direcao;

public class ControladorModoHistoriaPeloTeclado implements KeyListener {

	private final ControlavelModoHistoria controlavelModoHistoria;

	public ControladorModoHistoriaPeloTeclado(ControlavelModoHistoria controlavelModoHistoria) {
		this.controlavelModoHistoria = controlavelModoHistoria;
	}

	@Override
	public void keyTyped(KeyEvent e) {
	}

	@Override
	public void keyPressed(KeyEvent e) {
		Direcao.doCodigoTecla(e.getKeyCode()).ifPresent(
				d -> controlavelModoHistoria.efetuarMovimento(d));
	}

	@Override
	public void keyReleased(KeyEvent e) {
	}

}
