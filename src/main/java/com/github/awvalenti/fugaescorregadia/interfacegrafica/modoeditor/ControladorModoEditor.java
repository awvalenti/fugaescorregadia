package com.github.awvalenti.fugaescorregadia.interfacegrafica.modoeditor;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao.*;

import java.awt.Component;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseMotionListener;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;
import com.github.awvalenti.fugaescorregadia.nucleo.modoeditor.ControlavelModoEditor;

public class ControladorModoEditor implements KeyListener, MouseMotionListener {

	private final ControlavelModoEditor controlavel;
	private final ConversorDeXYParaPosicao conversor;
	private Posicao posicaoAtualCursor = aPosicao(0, 0);

	public ControladorModoEditor(ControlavelModoEditor controlavel,
			Component componenteDoTeclado, Component componenteDoMouse,
			ConversorDeXYParaPosicao conversor) {
		this.controlavel = controlavel;
		this.conversor = conversor;

		componenteDoTeclado.addKeyListener(this);
		componenteDoMouse.addMouseMotionListener(this);
	}

	@Override
	public void mouseMoved(MouseEvent e) {
		posicaoAtualCursor = conversor.converterParaPosicao(e.getX(), e.getY());
	}

	@Override
	public void keyPressed(KeyEvent e) {
		int numeroDigitado = e.getKeyChar() - '0';
		Elemento[] elementos = Elemento.values();
		if (numeroDigitado >= 0 && numeroDigitado < elementos.length) {
			controlavel.alterarElemento(posicaoAtualCursor, elementos[numeroDigitado]);
		}
	}

	@Override
	public void keyTyped(KeyEvent e) {
	}

	@Override
	public void keyReleased(KeyEvent e) {
	}

	@Override
	public void mouseDragged(MouseEvent e) {
	}

}
