package com.github.awvalenti.fugaescorregadia;

import org.junit.Before;

import com.google.inject.AbstractModule;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.Module;

public abstract class TesteBase {

	private Injector injector;

	@Before
	public final void criarInjetorDeDependencias() {
		injector = Guice.createInjector(MODULO_PARA_TESTES);
	}

	protected final <T> T obterInstancia(Class<T> tipo) {
		return injector.getInstance(tipo);
	}

	private final static Module MODULO_PARA_TESTES = new AbstractModule() {
		@Override
		protected void configure() {
		}
	};

}
