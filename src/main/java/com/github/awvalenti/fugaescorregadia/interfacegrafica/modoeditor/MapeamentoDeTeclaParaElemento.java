package com.github.awvalenti.fugaescorregadia.interfacegrafica.modoeditor;

import static com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.github.awvalenti.fugaescorregadia.nucleo.comum.Direcao;
import com.github.awvalenti.fugaescorregadia.nucleo.comum.Elemento;

public class MapeamentoDeTeclaParaElemento {

	private final Map<Character, Elemento> mapeamento = new HashMap<>();

	public MapeamentoDeTeclaParaElemento() {
		mapeamento.put('0', VAZIO);
		mapeamento.put('1', PERSONAGEM);
		mapeamento.put('2', SETA_BAIXO);
		mapeamento.put('3', PORTAL);
		mapeamento.put('4', SETA_ESQUERDA);
		mapeamento.put('5', OBSTACULO);
		mapeamento.put('6', SETA_DIREITA);

		mapeamento.put('8', SETA_CIMA);

		verificarMapeamentoDeTodosElementos();
	}

	public Optional<Elemento> elementoDaTecla(char codigoTecla) {
		return Optional.ofNullable(mapeamento.get(codigoTecla));
	}

	public Optional<Direcao> direcaoDaTecla(int codigoTecla) {
		return Direcao.doCodigoTecla(codigoTecla);
	}

	private void verificarMapeamentoDeTodosElementos() {
		for (Elemento e : Elemento.values()) {
			if (!mapeamento.containsValue(e)) {
				throw new IllegalStateException(e + " ausente do mapeamento de teclas");
			}
		}
	}

}
