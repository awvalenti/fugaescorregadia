package com.github.awvalenti.fugaescorregadia.interfacegrafica.comum;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.swing.Icon;
import javax.swing.ImageIcon;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;

public class FabricaIcones {

	private static final int LARGURA_SPRITE_SHEET = 3, ALTURA_SPRITE_SHEET = 3;

	private final Map<Elemento, Icon> cache = new HashMap<>();

	public FabricaIcones() {
		try {
			BufferedImage spritesheet = ImageIO.read(getClass().getResource(
					"/imagens/elementos/spritesheet-papel-4.png"));
			int tamanhoIcone = tamanhoIcone();
			for (Elemento e : Elemento.values()) {
				BufferedImage sprite = spritesheet.getSubimage(e.ordinal() % LARGURA_SPRITE_SHEET
						* tamanhoIcone, e.ordinal() / ALTURA_SPRITE_SHEET * tamanhoIcone,
						tamanhoIcone, tamanhoIcone);
				cache.put(e, new ImageIcon(sprite));
			}
		} catch (IOException e1) {
			throw new RuntimeException(e1);
		}
	}

	public Icon obter(Elemento elemento) {
		return cache.get(elemento);
	}

	public final int tamanhoIcone() {
		return 32;
	}

}
