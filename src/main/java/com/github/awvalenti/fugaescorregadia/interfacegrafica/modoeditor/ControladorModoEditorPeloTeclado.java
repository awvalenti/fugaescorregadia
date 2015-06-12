package com.github.awvalenti.fugaescorregadia.interfacegrafica.modoeditor;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;
import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao.*;

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Direcao;
import com.github.awvalenti.fugaescorregadia.nucleo.modoeditor.ControlavelModoEditor;

public class ControladorModoEditorPeloTeclado implements KeyListener {

	private final ControlavelModoEditor controlavel;

	public ControladorModoEditorPeloTeclado(ControlavelModoEditor controlavel) {
		this.controlavel = controlavel;
	}

	@Override
	public void keyTyped(KeyEvent e) {
	}

	@Override
	public void keyPressed(KeyEvent e) {
		Direcao.doCodigoTecla(e.getKeyCode()).ifPresent(
				d -> controlavel.alterarElemento(aPosicao(2, 2), OBSTACULO));
	}

	@Override
	public void keyReleased(KeyEvent e) {
	}

}
