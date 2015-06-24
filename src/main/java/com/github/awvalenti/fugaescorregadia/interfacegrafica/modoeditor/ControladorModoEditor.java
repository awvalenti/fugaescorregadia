package com.github.awvalenti.fugaescorregadia.interfacegrafica.modoeditor;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao.*;
import static java.awt.event.KeyEvent.*;

import java.awt.Component;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseMotionListener;
import java.util.Optional;

import javax.swing.JFileChooser;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;
import com.github.awvalenti.fugaescorregadia.nucleo.modoeditor.ControlavelModoEditor;

public class ControladorModoEditor implements KeyListener, MouseMotionListener {

	private final ControlavelModoEditor controlavel;
	private final ConversorDeXYParaPosicao conversor;
	private final MapeamentoDeTeclaParaElemento mapeamento;
	private final Component janela;

	private Optional<Elemento> selecaoElemento = Optional.empty();
	private Posicao posicaoAtualCursor = aPosicao(0, 0);
	private JFileChooser fileChooser = new JFileChooser();

	public ControladorModoEditor(ControlavelModoEditor controlavel,
			Component janela, Component componenteDoMouse,
			ConversorDeXYParaPosicao conversor, MapeamentoDeTeclaParaElemento mapeamento) {
		this.controlavel = controlavel;
		this.conversor = conversor;
		this.mapeamento = mapeamento;
		this.janela = janela;

		janela.addKeyListener(this);
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
		// TODO Melhorar
		switch (e.getKeyCode()) {
		case VK_F5:
			if (fileChooser.getSelectedFile() != null
					|| fileChooser.showSaveDialog(janela) == JFileChooser.APPROVE_OPTION) {
				controlavel.salvarMapa(fileChooser.getSelectedFile());
			}
			break;

		case VK_F8:
			if (fileChooser.showOpenDialog(janela) == JFileChooser.APPROVE_OPTION) {
				controlavel.carregarMapa(fileChooser.getSelectedFile());
			}
			break;

		default:
			mapeamento.direcaoDaTecla(e.getKeyCode()).ifPresent(direcao -> {
				controlavel.rotacionar(direcao);
			});
			mapeamento.elementoDaTecla(e.getKeyChar()).ifPresent(elemento -> {
				controlavel.alterarElemento(posicaoAtualCursor, elemento);
				selecaoElemento = Optional.of(elemento);
			});
			break;
		}
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
