package com.github.awvalenti.fugaescorregadia.interfacegrafica.comum;

import java.util.HashMap;
import java.util.Map;

import javax.swing.Icon;
import javax.swing.ImageIcon;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;

public class FabricaIcones {

	private Map<Elemento, Icon> cache = new HashMap<>();

	public FabricaIcones() {
		for (Elemento e : Elemento.values()) {
			String caminho = "/imagens/elementos/"
					+ e.name().toLowerCase().replace('_', '-') + ".png";
			cache.put(e, new ImageIcon(getClass().getResource(caminho)));
		}
	}

	public Icon obter(Elemento elemento) {
		return cache.get(elemento);
	}

	public int tamanhoIcone() {
		return 32;
	}

}
