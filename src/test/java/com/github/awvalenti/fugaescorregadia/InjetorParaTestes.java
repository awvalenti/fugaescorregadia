package com.github.awvalenti.fugaescorregadia;

import com.github.awvalenti.fugaescorregadia.componentes.FuncionalJava8;
import com.github.awvalenti.fugaescorregadia.nucleo.OperacoesFuncionais;
import com.google.inject.AbstractModule;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.Module;

public enum InjetorParaTestes {
	;

	public static Injector criarInjetorParaTestes() {
		return Guice.createInjector(MODULO_PARA_TESTES);
	}

	private final static Module MODULO_PARA_TESTES = new AbstractModule() {
		@Override
		protected void configure() {
			bind(OperacoesFuncionais.class).to(FuncionalJava8.class);
		}
	};

}
