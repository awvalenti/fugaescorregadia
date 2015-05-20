package com.github.awvalenti.fugaescorregadia.nucleo;

import javax.inject.Inject;

public class ElementoFactory {

	private final OperacoesFuncionais funcional;

	@Inject
	public ElementoFactory(OperacoesFuncionais funcional) {
		this.funcional = funcional;
	}

	public Elemento comCaractere(char c) {
		return funcional.deCaractereParaElemento(c);
	}

}
