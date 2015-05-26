package com.github.awvalenti.fugaescorregadia;

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
		}
	};

}
