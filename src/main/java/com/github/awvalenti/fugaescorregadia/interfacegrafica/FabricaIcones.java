package com.github.awvalenti.fugaescorregadia.interfacegrafica;

import javax.swing.Icon;
import javax.swing.ImageIcon;

import com.github.awvalenti.fugaescorregadia.nucleo.Elemento;

public class FabricaIcones {

	public Icon obter(Elemento elemento) {
		return new ImageIcon(getClass().getResource("/imagens/elementos/" + elemento.name().toLowerCase().replace('_', '-') + ".png"));
	}

}
