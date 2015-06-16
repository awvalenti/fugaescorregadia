package com.github.awvalenti.fugaescorregadia.programa;

import com.google.inject.AbstractModule;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.Module;

public enum InjetorProgramaPrincipal {
	;

	private final static Module MODULO_PROGRAMA_PRINCIPAL = new AbstractModule() {
		@Override
		protected void configure() {
		}
	};

	private static final Injector INJECTOR = Guice
			.createInjector(MODULO_PROGRAMA_PRINCIPAL);

	public static <T> T obterInstancia(Class<T> tipo) {
		return INJECTOR.getInstance(tipo);
	}

}
