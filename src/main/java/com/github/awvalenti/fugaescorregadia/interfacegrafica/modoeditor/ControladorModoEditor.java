package com.github.awvalenti.fugaescorregadia.interfacegrafica.modoeditor;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao.*;

import java.awt.Component;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseMotionListener;
import java.util.Optional;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;
import com.github.awvalenti.fugaescorregadia.nucleo.modoeditor.ControlavelModoEditor;

public class ControladorModoEditor implements KeyListener, MouseMotionListener {

	private final ControlavelModoEditor controlavel;
	private final ConversorDeXYParaPosicao conversor;
	private final MapeamentoTeclasModoEditor mapeamento;

	private Optional<Elemento> selecaoElemento = Optional.empty();
	private Posicao posicaoAtualCursor = aPosicao(0, 0);

	public ControladorModoEditor(ControlavelModoEditor controlavel,
			Component componenteDoTeclado, Component componenteDoMouse,
			ConversorDeXYParaPosicao conversor, MapeamentoTeclasModoEditor mapeamento) {
		this.controlavel = controlavel;
		this.conversor = conversor;
		this.mapeamento = mapeamento;

		componenteDoTeclado.addKeyListener(this);
		componenteDoMouse.addMouseMotionListener(this);
	}

	@Override
	public synchronized void mouseMoved(MouseEvent e) {
		posicaoAtualCursor = conversor.converterParaPosicao(e.getX(), e.getY());
		selecaoElemento.ifPresent(elemento -> controlavel.alterarElemento(
				posicaoAtualCursor, elemento));
	}

	@Override
	public synchronized void keyPressed(KeyEvent e) {
		mapeamento.elementoDaTecla(e.getKeyChar()).ifPresent(elemento -> {
			controlavel.alterarElemento(posicaoAtualCursor, elemento);
			selecaoElemento = Optional.of(elemento);
		});
	}

	@Override
	public synchronized void keyReleased(KeyEvent e) {
		selecaoElemento = Optional.empty();
	}

	@Override
	public void keyTyped(KeyEvent e) {
	}

	@Override
	public void mouseDragged(MouseEvent e) {
	}

}
