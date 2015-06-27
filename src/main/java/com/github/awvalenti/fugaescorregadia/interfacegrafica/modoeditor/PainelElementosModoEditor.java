package com.github.awvalenti.fugaescorregadia.interfacegrafica.modoeditor;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao.*;

import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;

import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.FabricaIcones;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.PainelElementos;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.SaidaMapa;

public class PainelElementosModoEditor extends PainelElementos implements SaidaMapa, ConversorDeXYParaPosicao {

	private static final long serialVersionUID = 1L;

	private final AlphaComposite alphaCompostie = AlphaComposite.getInstance(AlphaComposite.SRC_OVER, 0.1f);

	public PainelElementosModoEditor(int numeroLinhas, int numeroColunas,
			FabricaIcones fabricaIcones) {
		super(numeroLinhas, numeroColunas, fabricaIcones);
	}

	@Override
	public final void paint(Graphics g) {
		super.paint(g);
		((Graphics2D) g).setComposite(alphaCompostie);
		g.setColor(Color.GRAY);
		desenharLinhaGuiaHorizontal(g, fabricaIcones.tamanhoIcone());
		desenharLinhaGuiaVertical(g, fabricaIcones.tamanhoIcone());
	}

	private void desenharLinhaGuiaHorizontal(Graphics g, int tamanho) {
		g.fillRect(0, (numeroLinhas - 2 + numeroLinhas % 2) / 2 * tamanho, numeroColunas * tamanho, (2 - numeroLinhas % 2) * tamanho);
	}

	private void desenharLinhaGuiaVertical(Graphics g, int tamanho) {
		g.fillRect((numeroColunas - 2 + numeroColunas % 2) / 2 * tamanho, 0, (2 - numeroColunas % 2) * tamanho, numeroLinhas * tamanho);
	}

	@Override
	public void mapaCompletamenteAlterado(MapaLeitura mapa) {
		preencher(mapa);
		repaint();
	}

	@Override
	public void elementoAlterado(Posicao p, Elemento novo) {
		alterarElemento(p, novo);
		repaint(areaDoElementoNaPosicao(p));
	}

	@Override
	public Posicao converterParaPosicao(int x, int y) {
		return aPosicao(y / fabricaIcones.tamanhoIcone(), x / fabricaIcones.tamanhoIcone());
	}

}
