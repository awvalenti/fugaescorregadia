package com.github.awvalenti.fugaescorregadia.interfacegrafica.modohistoria;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;

import java.awt.Point;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;

import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.FabricaIcones;
import com.github.awvalenti.fugaescorregadia.interfacegrafica.comum.PainelElementos;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.MapaLeitura;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Posicao;
import com.github.awvalenti.fugaescorregadia.nucleo.modohistoria.SaidaModoHistoria;

public class PainelElementosModoHistoria extends PainelElementos implements SaidaModoHistoria {

	private static final long serialVersionUID = 1L;

	public PainelElementosModoHistoria(int atrasoAtualizacaoTela,
			int numeroLinhas, int numeroColunas, FabricaIcones fabricaIcones) {
		super(atrasoAtualizacaoTela, numeroLinhas, numeroColunas, fabricaIcones);
		esconderCursor();
	}

	private void esconderCursor() {
		setCursor(Toolkit.getDefaultToolkit().createCustomCursor(
				new BufferedImage(16, 16, BufferedImage.TYPE_INT_ARGB), new Point(0, 0), ""));
	}

	@Override
	public void inicioTentativa(MapaLeitura mapa) {
		preencher(mapa);
	}

	@Override
	public void movimento(Posicao origem, Elemento elementoNaOrigem, Posicao destino) {
		alterarElemento(origem, elementoNaOrigem);
		alterarElemento(destino, PERSONAGEM);
		paintImmediately(areaDoElementoNaPosicao(origem));
		paintImmediately(areaDoElementoNaPosicao(destino));
		try {
			Thread.sleep(atrasoAtualizacaoTela);
		} catch (InterruptedException e) {
			throw new RuntimeException(e);
		}
	}

}